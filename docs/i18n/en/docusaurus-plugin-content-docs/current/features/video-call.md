---
sidebar_position: 3
slug: /features/video-call
title: Video Call
description: Face-to-face video companionship with AI
---

# Video Call

Video call is Eidolon's most immersive feature — turn on your camera, let AI see you, and experience true face-to-face companionship.

---

## Starting a Video Call

1. In the chat page, tap the **📹 Video Call** button above the input box
2. Wait for the connection to establish (shows "Connecting...")
3. Once connected, you enter the video call interface

---

## Call Interface

The video call interface includes:

| Area | Description |
|------|-------------|
| AI Character | The AI character in the center, with real-time expressions and animations |
| Local Preview | Preview of your camera/screen feed |
| Control Bar | Mute, camera, screen share, hang up, etc. |
| Subtitles | Real-time subtitles when AI speaks |

---

## In-Call Controls

### Basic Controls

| Action | Description |
|--------|-------------|
| Mute/Unmute | Toggle microphone on/off |
| Camera On/Off | Toggle camera feed |
| Screen Share | Share your computer screen with AI (desktop only) |
| Hang Up | End the call |

### Voiceprint Noise Reduction

Video calls support **voiceprint noise reduction**, filtering background noise so AI can hear you more clearly:

- **Active**: Noise reduction is working
- **Registering**: Your voiceprint is being registered
- **Disabled**: Noise reduction is not enabled

Voiceprint registration happens automatically during your first call, then activates automatically in subsequent calls.

### Half-Body Mode

Enabled by default. During video calls, the AI character switches to half-body mode with a default animation. Expressions, lip-sync, and mouse tracking still work normally.

You can disable this in **Settings → Preferences → Video Call Half-Body Mode**.

---

## Screen Sharing (Desktop)

During desktop video calls, you can share your screen with AI:

1. Click the **Screen Share** button
2. Select the screen or window to share
3. AI can now see your screen content

This is very useful for having AI help operate your computer or analyze screen content.

---

## Auto-Hangup Protection

By default, video calls automatically remind you after **60 minutes** and hang up 5 minutes later. This prevents accidentally leaving a call running and wasting quota.

To continue the call, click **"Continue Call"** when the reminder appears.

You can disable this protection in **Settings → Preferences → 60-min Auto-Hangup**.

---

## Privacy Protection

Eidolon takes your privacy seriously:

- Video feeds are used only for real-time conversation and are not stored
- Call transcripts save only text content
- You can turn off your camera at any time
- **Privacy rendering protection**: When the camera angle approaches sensitive areas, the AI character automatically enables blur protection

---

## Call Records

After the call ends, a call record card appears in chat history:

- Call type (Video Call)
- Call duration
- Conversation transcript

---

## Two Call Modes

Eidolon supports two video call backends:

| Mode | Features |
|------|----------|
| veRTC (default) | Stable and reliable, supports voiceprint noise reduction |
| Omni | Low latency, supports voice cloning |

:::info Voice Cloning
Genesis subscribers can upload voice samples, and AI will speak in your voice during Omni video calls. See [TTS Voice Settings](/features/tts).
:::

---

## Common Issues

### Video call connection failed?
- Check your network connection
- Confirm camera and microphone permissions are granted
- Close other apps using the camera

### Video lagging?
- Check your network bandwidth
- Close other bandwidth-intensive apps
- Try turning off screen sharing

### Quota used up?
Video calls consume subscription quota. When quota runs out, the call ends automatically. Upgrade your subscription or wait for quota refresh.
