---
sidebar_position: 6
slug: /features/settings
title: Settings & Preferences
description: "Every option in one place: language and theme, chat model and thinking depth, reply pacing, proactive delay, widgets, auto-start, call guards and resets."
---

# Settings & Preferences

Sholarel's Settings page collects every personalization option, so you can tune the app to your own habits and needs. Open **Settings** to view and change them all.

---

## Appearance

Appearance covers interface themes, fonts, character models and avatars. See these dedicated pages:

- [Themes & Appearance](/features/theme) — themes, fonts, ambient atmosphere
- [Character Model](/features/avatar) — VRM/Live2D models, avatars, floating window

---

## Preferences

### Interface Language

Sholarel supports two interface languages, **Simplified Chinese** and **English**.

1. Go to **Settings → Preferences → Language**
2. Pick a language from the dropdown
3. The interface switches immediately, no restart needed

### Main Chat Model <span class="tier-badge tier-genesis">Genesis</span>

Genesis users can switch the AI model used for main chat:

| Model | Strengths |
|-------|-----------|
| Gemini 3.1 Flash Lite | Light and fast, great for casual chat |
| Gemini 3.5 Flash | Balanced performance and quality (default) |
| Claude Opus 4.7 (1M) | Strongest reasoning, very long context |
| Claude Haiku 4.5 | Fast responses at a lower cost |

:::info Subscription requirement
Choosing your own main chat model is a Genesis-only privilege. Other tiers use the system default model.
:::

### Gemini Thinking Depth

Controls how deeply Gemini reasons before replying:

| Level | Effect |
|-------|--------|
| minimal | Fastest responses, suited to simple conversation |
| low | Light reasoning, balancing speed and quality |
| medium | Default level, suits most situations |
| high | Deep reasoning, first choice for complex questions |

Higher levels reason better but respond more slowly and use more quota. Applies to Gemini models only.

### Sub-Agent (AI Agent) <span class="tier-badge tier-genesis">Genesis</span>

When enabled, the AI sub-agent can carry out complex multi-step tasks such as running terminal commands, browsing the web and automating your desktop. See [AI Agent](/features/agent).

### Gender

Set your gender to help AI understand your identity and communication preferences better. You can change it at any time.

### Reply Pacing

On by default. AI renders replies sentence by sentence, imitating a natural typing rhythm. Turn it off to shorten the gaps between sentences and show messages faster.

### Proactive Reply Delay

When AI has something to say on its own (a reminder, a check-in), this sets the range of delay:

- **Minimum delay**: how many seconds at the earliest (10 seconds by default)
- **Maximum delay**: how many seconds at the latest (60 seconds by default)

Tuning this range makes AI's proactive messages feel more natural — neither an instant reply nor a long wait.

### Launch at Startup (Desktop)

- **Launch at startup**: start Sholarel automatically when the system boots
- **Start minimized**: run minimized on startup so it doesn't interrupt boot

### Desktop Widgets (Desktop)

When enabled, floating windows on your desktop show summary, to-do, habit and mood widgets at all times. See [Life Feed & Widgets](/features/life).

### Pseudo-Fullscreen While Focusing (Desktop)

Entering Focus Mode expands the window into pseudo-fullscreen to reduce distractions. See [Focus Mode](/features/focus-timer).

### Half-Body Video Calls (Desktop)

During video calls, the AI character switches to half-body mode with default motions. Expressions, lip-sync and cursor following still work. On by default.

### Auto-Hang Up After 60 Minutes

On by default. At 60 minutes into a video call a reminder appears, and the call hangs up automatically 5 minutes later, so a forgotten call doesn't waste quota. See [Video Call](/features/video-call).

### Sensitive-Area Rendering Protection

On by default. When the camera angle moves close to a sensitive area, the AI character automatically applies blur and shake protection.

### Emoji Reference Image

AI needs a reference image to determine the style when generating emoji packs:

- **Default**: captured automatically from the current VRM model
- **Custom**: turn on "Use a custom reference image" and upload your own

See [Emoji & Stickers](/features/emoji-sticker).

### Floating Window Size (Desktop)

Adjusts the size of the desktop floating character, from 50% to 200%, 100% by default.

### Live2D Model Scale

Adjusts how large the Live2D model appears, from 50% to 200%, 100% by default.

---

## Subscription

Check your current tier, remaining days and Echo quota. See [Subscription & Benefits](/features/subscription).

---

## TTS Voice Settings

Adjust the emotional intensity and reference audio for AI's voice. See [TTS Voice Settings](/features/tts).

---

## QQ Bot

Configure credentials for a QQ Open Platform bot. See [QQ Bot](/features/qqbot).

---

## WeChat Integration

Connect your WeChat account so AI can reply to WeChat messages for you. See [WeChat Integration](/features/wechat).

---

## Alarms & Reminders

Manage alarms and scheduled reminders. See [Alarms & Reminders](/features/alarm).

---

## MCP Tool Extensions

Configure MCP servers to extend AI's capabilities. See [MCP Tool Extensions](/features/mcp).

---

## Danger Zone

At the bottom of Settings, the **Danger Zone** holds irreversible actions:

| Action | Description |
|--------|-------------|
| Clear local cache | Clears cached messages and data on this device; cloud data is untouched |
| Reset all settings | Restores every setting to its default |

:::caution
Actions in the Danger Zone cannot be undone — proceed carefully.
:::

---

## Tips

- Most settings take effect immediately, no restart required
- Settings sync to the cloud automatically, so they stay consistent across devices
- If something behaves oddly, use "Reset all settings" in the Danger Zone
