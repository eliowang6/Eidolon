---
sidebar_position: 2
slug: /features/qqbot
title: QQ Bot
description: Turn AI into a QQ bot that auto-replies
---

# QQ Bot

Eidolon supports connecting to the QQ Open Platform, turning AI into a QQ bot that auto-replies in QQ channels or group chats.

---

## Enabling QQ Bot

1. Visit the [QQ Open Platform](https://q.qq.com/) to register and create a bot application
2. Obtain the bot's **AppID** and **AppSecret**
3. In Eidolon, go to **Settings → QQ Bot**
4. Enter the AppID and AppSecret
5. Enable the toggle
6. Click Save

---

## Configuration

| Field | Description | How to Get |
|-------|-------------|------------|
| AppID | Bot's application ID | From QQ Open Platform after creating an app |
| AppSecret | Bot's application secret | From QQ Open Platform app details page |
| Enabled | Whether to enable the QQ bot | Toggle switch |

---

## Status Guide

| Status | Meaning |
|--------|---------|
| Running · Listening | Connected to Tencent gateway, AI auto-replies on QQ |
| Not Connected | Need to fill in credentials and enable |

---

## How It Works

Once enabled:

1. QQ users @mention your bot in a channel or group
2. The message is forwarded to Eidolon AI
3. AI generates a reply
4. The reply is sent through the QQ bot

---

## Security Tips

- AppSecret is sensitive information — do not share it with others
- Change AppSecret regularly
- If you suspect a key leak, reset it immediately on the QQ Open Platform

---

## Common Issues

### Bot can't connect?
- Check that AppID and AppSecret are correct
- Confirm your network connection is working
- Make sure the QQ Open Platform application has been approved

### Bot not replying?
- Confirm users are @mentioning the bot (not just sending regular messages)
- Check that AI services are running normally
- View the bot status on the settings page
