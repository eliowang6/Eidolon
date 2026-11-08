---
sidebar_position: 2
slug: /install
title: Installation Guide
description: "Install by platform: the Windows MSI and SmartScreen prompt, Android APK with unknown sources, and the browser build. Also lists requirements."
---

# Installation Guide

Sholarel is available on **Windows Desktop**, **Android**, and **Web**. Below are detailed steps for each platform.

---

## Windows Desktop

### System Requirements

- Windows 10 version 1803 or higher
- 4 GB RAM or more
- 600 MB available disk space (MSI installer is 232,304,640 bytes, about 222 MB; the installed program directory is about 252 MB)
- Stable internet connection

### Installation Steps

1. Visit the [official download page](https://sholarel.instarmony.com/en/download)
2. Download the latest `.msi` installer
3. Double-click the downloaded `.msi` file
4. If Windows shows a "Windows protected your PC" prompt:
   - Click **"More info"**
   - Click **"Run anyway"**
5. Follow the installation wizard to complete setup
6. Launch Sholarel from your desktop or Start menu

### First Launch

On first launch, Windows may show a firewall prompt. Select **"Allow access"**, otherwise Sholarel cannot connect to the server.

### Desktop-Exclusive Features

| Feature | Description |
|---------|-------------|
| Floating Window | Character floats as a small window on your desktop, always visible |
| Auto-start on Boot | Automatically launches Sholarel when the system starts |
| Focus Mode Fullscreen | Focus mode automatically expands the window to pseudo-fullscreen |
| Screen Capture/Record | Capture screenshots or record your screen directly in chat |

---

## Android

### System Requirements

- Android 7.0 (API 24) or higher
- 64-bit (arm64-v8a) devices only
- 3 GB RAM or more
- 700 MB available storage (the APK is 270,646,006 bytes, about 258 MB; Android also keeps an install copy during setup)

### Installation Steps

1. Download the `.apk` file from the [official download page](https://sholarel.instarmony.com/en/download)
2. Open the downloaded APK on your phone
3. If prompted about "unknown sources":
   - Go to **Settings → Security**
   - Enable **"Allow installation from unknown sources"**
4. Wait for installation to complete
5. Find the Sholarel icon in your app list and tap to open

### Permissions

Sholarel may request the following permissions on Android:

| Permission | Purpose |
|------------|---------|
| Microphone | Voice calls, voice messages |
| Camera | Video calls, photo capture |
| Notifications | Alarm reminders, message notifications |
| Usage Access | Daily summaries (requires separate authorization) |

:::tip Usage Access Permission
On Android, if you want more accurate daily summaries, you need to grant "Usage Access" permission separately. Path: **Settings → Apps → Sholarel → Usage Access**.
:::

---

## Web

### Usage

Just open [https://web.eidolon.instarmony.com/](https://web.eidolon.instarmony.com/) in your browser — no installation needed.

:::info The web app is currently in invite-only beta
The web app is not publicly launched yet: an invite code is required to sign up, and the deployed version may temporarily lag behind the desktop client. Features and account data match the client; see the limitations below.
:::

### Browser Requirements

- Chrome 90+, Edge 90+, Firefox 90+, Safari 15+
- WebRTC support (required for audio/video calls)

### Web Limitations

The web version is mostly feature-complete, but the following are unavailable due to browser limitations:

- Floating window mode
- Auto-start on boot
- Local notifications (alarm reminders)
- Screen capture/recording

---

## Updates

### Desktop Updates

Sholarel desktop supports automatic updates. When a new version is available, you'll see an update prompt on launch. Confirm to download and install automatically.

If auto-update fails, manually download the latest installer from the [official download page](https://sholarel.instarmony.com/en/download) and reinstall.

### Mobile Updates

The mobile app requires manual APK download and reinstall. All data and settings are preserved after reinstalling.

---

## Uninstallation

### Windows

- **Settings → Apps → Sholarel → Uninstall**
- Or run the uninstaller from the installation directory

### Android

- **Settings → Apps → Sholarel → Uninstall**

:::caution Uninstallation Note
Uninstalling does not affect your account or cloud data. After reinstalling and logging in with the same account, your conversation history and settings will be automatically restored.
:::
