---
sidebar_position: 1
slug: /features/avatar
title: Character Model
description: 3D character rendering, VRM/Live2D models, and avatar settings
---

# Character Model

One of Eidolon's core experiences is **3D character companionship**. The AI companion appears as a character on your desktop, reacting to conversations with expressions, animations, and lip-syncing.

---

## Character Rendering Modes

Eidolon supports multiple character rendering modes:

| Mode | Description | Features |
|------|-------------|----------|
| **VRM** | 3D character model | Expressions, animations, mouse tracking |
| **Live2D** | 2D animation model | More delicate expression changes |
| **GLB** | General 3D model | Broad compatibility |

---

## Loading a Model

### Select a Model

1. In **Settings → Appearance → Character Model**, click **"Load Model"**
2. Or click the **"Load Model"** button in the floating window
3. Select a VRM or Live2D model file
4. Wait for the model to finish loading

### Model Selector

The model selector lets you switch between modes:

- **Switch to VRM**: Use a 3D model
- **Switch to Live2D**: Use a 2D animated model

---

## Character Interactions

After loading a model, the character will:

| Behavior | Description |
|----------|-------------|
| Expression changes | Shows happiness, sadness, etc. based on conversation |
| Animation playback | Waves, dances, and other actions |
| Lip sync | Mouth moves when speaking |
| Mouse tracking | Character's gaze follows your mouse (desktop) |
| Listening state | Character shows a listening expression when you speak |

---

## Avatar Settings

You can set avatars for both the user and AI:

1. Go to **Settings → Appearance → Avatars**
2. Click the upload button for **User Avatar** or **AI Avatar**
3. Select an image file to upload
4. After upload, avatars sync across chat, life, and us pages

### Avatar Notes

- Avatars are shared across chat, life feed, and the "Us" page
- Can be changed or reset to default at any time
- Supports common image formats (JPG, PNG, GIF)

---

## Floating Window Mode (Desktop)

Desktop supports displaying the character as a floating window:

- Character floats as a small always-on-top window
- You can always see the character's state
- Floating window size is adjustable in settings

### Adjust Floating Window Size

In **Settings → Preferences → Floating Window Scale**:

- 100% is the default size
- Adjustable range: 50% - 200%

---

## Home Character Size

In **Settings → Preferences → Home Character Scale**, adjust the character display size on the home page:

- 100% is the default size
- Adjustable range: 50% - 200%

---

## Privacy Protection

Eidolon enables **privacy rendering protection** by default:

- When the camera angle approaches sensitive areas, the character automatically enables blur and shake protection
- Can be disabled in **Settings → Preferences → Privacy Rendering Protection**

---

## Common Issues

### Model loading failed?
- Check that the model file format is correct (VRM/Live2D/GLB)
- Confirm the file isn't corrupted
- Try reloading

### Character not speaking/moving?
- Confirm the model loaded successfully
- Check if you're in an active conversation (character moves when AI replies)
- Try sending a message to trigger a character reaction
