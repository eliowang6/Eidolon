#!/usr/bin/env bash
# Install a published instarmony.com package on the server.
#
#   bash install-site.sh <sha256-of-tarball> [--site-root DIR] [--base-url URL]
#   bash install-site.sh <sha256-of-tarball> --archive PATH   # skip the download
#
# Run it from your workstation over ssh, so the server never needs a git clone
# of this repository:
#
#   SHA=$(python scripts/publish-site.py | sed -n 's/.*SHA-256: //p')
#   ssh <server> "bash -s" "$SHA" < scripts/install-site.sh
#
# The swap is atomic: download -> verify digest -> safe extract -> rename, and a
# failed swap restores the previous release. A second concurrent run is refused
# by the lock directory. The package is produced by scripts/publish-site.py and
# holds site content only, so the target is never a git checkout.
set -euo pipefail

DIGEST="${1:-}"
shift || true

SITE_ROOT="${SITE_ROOT:-/home/ec2-user/instarmony_website}"
BASE_URL="${CF_R2_PUBLIC_URL:-https://storage.instarmony.com}"
ARCHIVE=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --site-root) SITE_ROOT="${2:?--site-root needs a value}"; shift 2 ;;
        --base-url) BASE_URL="${2:?--base-url needs a value}"; shift 2 ;;
        --archive) ARCHIVE="${2:?--archive needs a value}"; shift 2 ;;
        *) echo "unknown argument: $1" >&2; exit 1 ;;
    esac
done

if [[ ! "$DIGEST" =~ ^[0-9a-fA-F]{64}$ ]]; then
    echo "usage: install-site.sh <64-char sha256 of the package> [--site-root DIR] [--base-url URL] [--archive PATH]" >&2
    exit 1
fi
command -v python3 >/dev/null 2>&1 || { echo "python3 is required" >&2; exit 1; }
if [[ -z "$ARCHIVE" ]]; then
    command -v curl >/dev/null 2>&1 || { echo "curl is required unless --archive is given" >&2; exit 1; }
fi

mkdir -p "$SITE_ROOT"

python3 - "$SITE_ROOT" "${BASE_URL%/}" "$(echo "$DIGEST" | tr 'A-F' 'a-f')" "$ARCHIVE" <<'PY'
import hashlib
import shutil
import signal
import subprocess
import sys
import tarfile
import tempfile
import uuid
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit

root = Path(sys.argv[1]).resolve(strict=True)
base = sys.argv[2].rstrip("/")
expected = sys.argv[3].lower()
provided_archive = sys.argv[4].strip() if len(sys.argv) > 4 else ""
url = urlsplit(base)
if url.scheme != "https" or not url.netloc or url.query or url.fragment or url.username or url.password:
    raise SystemExit("package base URL must be HTTPS without credentials, query or fragment")

site = root
if site.is_symlink() or not site.is_dir():
    raise SystemExit("site root must be a real directory, not a symlink or file")
if (site / ".git").exists():
    raise SystemExit(
        f"site root {site} is a git checkout; this installs the published package only. "
        "Point --site-root at the directory the web server reads."
    )

lock = site.parent / f".{site.name}.deploy-lock"
try:
    lock.mkdir()
except FileExistsError:
    raise SystemExit(f"deployment lock already exists: {lock}")

stage = site.parent / f".{site.name}.staging-{uuid.uuid4().hex}"
backup = site.parent / f"{site.name}.backup-{uuid.uuid4().hex}"
required = ("index.html", "eidolon/index.html", "docs/build/index.html", "docs/build/en/index.html")


def interrupted(signum, frame):
    raise InterruptedError(f"deployment interrupted by signal {signum}")


signals = (signal.SIGINT, signal.SIGTERM)
if hasattr(signal, "SIGHUP"):
    signals += (signal.SIGHUP,)
for sig in signals:
    signal.signal(sig, interrupted)


def require_files(directory: Path, label: str) -> None:
    for name in required:
        if not (directory / name).is_file():
            raise ValueError(f"{label} incomplete: missing {name}")


swapped = False
try:
    stage.mkdir(mode=0o755)
    with tempfile.TemporaryDirectory(prefix=".instarmony-download-", dir=site.parent) as download:
        archive = Path(download) / "Instarmony_Website_Release.tar.gz"
        if provided_archive:
            shutil.copyfile(provided_archive, archive)
        else:
            subprocess.run([
                "curl", "-fSL", "--proto", "=https", "--proto-redir", "=https",
                "--retry", "3", "--retry-delay", "2", "--connect-timeout", "10",
                "--max-time", "600", "-o", str(archive),
                f"{base}/deploy/Instarmony_Website_Release.tar.gz?sha256={expected}",
            ], check=True)
        digest = hashlib.sha256()
        with archive.open("rb") as source:
            for chunk in iter(lambda: source.read(1024 * 1024), b""):
                digest.update(chunk)
        if digest.hexdigest() != expected:
            raise ValueError("package SHA-256 mismatch")
        with tarfile.open(archive, "r:gz") as package:
            members = [member for member in package.getmembers() if member.name not in (".", "./")]
            seen = set()
            for member in members:
                name = member.name[2:] if member.name.startswith("./") else member.name
                relative = PurePosixPath(name)
                if (not name or relative.is_absolute() or ".." in relative.parts
                        or "\\" in name or ":" in name
                        or any(ord(char) < 32 for char in name)
                        or not (member.isdir() or member.isreg())):
                    raise ValueError(f"unsafe archive member: {member.name!r}")
                if relative in seen:
                    raise ValueError(f"duplicate archive path: {member.name!r}")
                seen.add(relative)
            for member in members:
                name = member.name[2:] if member.name.startswith("./") else member.name
                destination = stage / name
                if member.isdir():
                    destination.mkdir(parents=True, exist_ok=True, mode=0o755)
                else:
                    destination.parent.mkdir(parents=True, exist_ok=True, mode=0o755)
                    extracted = package.extractfile(member)
                    if extracted is None:
                        raise ValueError(f"archive member has no content: {member.name!r}")
                    with extracted as source, destination.open("xb") as target:
                        shutil.copyfileobj(source, target)
                    destination.chmod(0o644)
    stage.chmod(0o755)
    for directory in stage.rglob("*"):
        if directory.is_dir():
            directory.chmod(0o755)
    require_files(stage, "package")

    site.rename(backup)
    swapped = True
    try:
        stage.rename(site)
        require_files(site, "installed site")
    except BaseException:
        for sig in signals:
            signal.signal(sig, signal.SIG_IGN)
        if site.exists():
            failed = site.parent / f".{site.name}.failed-{uuid.uuid4().hex}"
            site.rename(failed)
            print(f"[ERROR] keeping the rejected release at {failed}", file=sys.stderr)
        backup.rename(site)
        print("[OK] rolled back to the previous release", file=sys.stderr)
        raise
    for sig in signals:
        signal.signal(sig, signal.SIG_IGN)
    print(f"Site installed: {site}; SHA-256: {expected}")
    if backup.exists():
        print(f"Previous release kept at: {backup}")
except BaseException as error:
    for sig in signals:
        signal.signal(sig, signal.SIG_IGN)
    if not swapped:
        print(f"[ERROR] aborted before the swap, live release untouched: {error}", file=sys.stderr)
    elif not site.exists() and backup.exists():
        backup.rename(site)
        print("[OK] rolled back to the previous release", file=sys.stderr)
    raise
finally:
    if stage.exists():
        shutil.rmtree(stage)
    if lock.exists():
        lock.rmdir()
PY
