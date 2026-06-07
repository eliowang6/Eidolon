---
sidebar_position: 1
slug: /features/wechat
title: WeChat Integration
description: Let AI auto-reply to your WeChat messages
---

# WeChat Integration

Eidolon can connect to your WeChat account, letting the AI assistant auto-reply to messages. Even when you're busy, AI can respond to your friends on your behalf.

---

## Enabling WeChat Integration

1. Go to **Settings → WeChat**
2. Enable the WeChat integration toggle
3. Click the **"Login to WeChat"** button
4. Scan the QR code in the popup window to log in

### Login Flow

1. After clicking login, a new window opens showing a WeChat QR code
2. Scan the QR code with your phone's WeChat
3. Confirm login on your phone
4. Status changes to **"Running · Listening"** indicating a successful connection

---

## How It Works

Once enabled, when someone sends you a WeChat message:

1. The message is forwarded to Eidolon AI
2. AI generates a reply based on conversation context
3. The reply is automatically sent to the WeChat conversation

Your friends see the AI replying on your behalf.

---

## Managing WeChat Integration

| Action | Description |
|--------|-------------|
| Enable/Disable | Toggle the switch in settings |
| Re-login | If the connection drops, rescan the QR code |
| View Status | Settings page shows current connection status |

### Status Guide

| Status | Meaning |
|--------|---------|
| Running · Listening | Connected, AI is auto-replying |
| Not Connected | Need to log in to WeChat |

---

## Important Notes

:::caution Important Reminders
- WeChat integration relies on third-party tools and may carry a risk of account suspension
- Recommended for use on secondary/test accounts only
- Do not let AI reply to messages involving money, passwords, or other sensitive information
- Long-running sessions may cause WeChat login to expire, requiring re-scanning
:::

---

## Common Issues

### WeChat login failed?
- Confirm your network connection is working
- Try rescanning the QR code
- Check if WeChat is already logged in on another device

### AI replies are inappropriate?
- AI's reply style depends on your system prompt and conversation history
- Adjust the system prompt in settings to change AI's reply style
- Test for a while first to ensure AI reply quality is satisfactory before formal use
