---
sidebar_position: 2
slug: /install
title: Installation Guide
description: Detailed installation instructions for each platform
---

# Installation Guide

Eidolon is available on **Windows Desktop**, **Android**, and **Web**. Below are detailed steps for each platform.

---

## Windows Desktop

### System Requirements

- Windows 10 version 1803 or higher
- 4 GB RAM or more
- 500 MB available disk space
- Stable internet connection

### Installation Steps

1. Visit the [GitHub Releases](https://github.com/instarmony/eidolon/releases) page
2. Find the latest version and download the `.msi` installer
3. Double-click the downloaded `.msi` file
4. If Windows shows a "Windows protected your PC" prompt:
   - Click **"More info"**
   - Click **"Run anyway"**
5. Follow the installation wizard to complete setup
6. Launch Eidolon from your desktop or Start menu

### First Launch

On first launch, Windows may show a firewall prompt. Select **"Allow access"**, otherwise Eidolon cannot connect to the server.

### Desktop-Exclusive Features

| Feature | Description |
|---------|-------------|
| Floating Window | Character floats as a small window on your desktop, always visible |
| Auto-start on Boot | Automatically launches Eidolon when the system starts |
| Focus Mode Fullscreen | Focus mode automatically expands the window to pseudo-fullscreen |
| Screen Capture/Record | Capture screenshots or record your screen directly in chat |

---

## Android

### System Requirements

- Android 8.0 (API 26) or higher
- 2 GB RAM or more
- 100 MB available storage

### Installation Steps

1. Download the `.apk` file from the [GitHub Releases](https://github.com/instarmony/eidolon/releases) page
2. Open the downloaded APK on your phone
3. If prompted about "unknown sources":
   - Go to **Settings → Security**
   - Enable **"Allow installation from unknown sources"**
4. Wait for installation to complete
5. Find the Eidolon icon in your app list and tap to open

### Permissions

Eidolon may request the following permissions on Android:

| Permission | Purpose |
|------------|---------|
| Microphone | Voice calls, voice messages |
| Camera | Video calls, photo capture |
| Notifications | Alarm reminders, message notifications |
| Usage Access | Daily summaries (requires separate authorization) |

:::tip Usage Access Permission
On Android, if you want more accurate daily summaries, you need to grant "Usage Access" permission separately. Path: **Settings → Apps → Eidolon → Usage Access**.
:::

---

## Web

### Usage

Simply visit the Eidolon web address in your browser — no installation needed.

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

Eidolon desktop supports automatic updates. When a new version is available, you'll see an update prompt on launch. Confirm to download and install automatically.

If auto-update fails, manually download the latest installer from the Releases page and reinstall.

### Mobile Updates

The mobile app requires manual APK download and reinstall. All data and settings are preserved after reinstalling.

---

## Uninstallation

### Windows

- **Settings → Apps → Eidolon → Uninstall**
- Or run the uninstaller from the installation directory

### Android

- **Settings → Apps → Eidolon → Uninstall**

:::caution Uninstallation Note
Uninstalling does not affect your account or cloud data. After reinstalling and logging in with the same account, your conversation history and settings will be automatically restored.
:::
