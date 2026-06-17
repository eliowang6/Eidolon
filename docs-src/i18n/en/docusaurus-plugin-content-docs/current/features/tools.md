---
sidebar_position: 4
slug: /features/tools
title: Tool Calling
description: AI proactively creates to-dos, habits, images, and more for you
---

# Tool Calling

Eidolon's AI doesn't just chat — it can **proactively take actions**, creating to-do items, setting up habit trackers, generating images, and sending voice messages. These actions appear as **tool cards** in the conversation.

---

## What Is Tool Calling?

When AI determines it needs to help you do something, it invokes a "tool" and generates a structured card displayed in the chat. You can confirm or undo these actions.

Currently supported tool types:

| Tool | Description | Example |
|------|-------------|---------|
| Create To-Do | Create a task for you | "Remind me about tomorrow's meeting" |
| Complete To-Do | Mark a task as done | "Mark the grocery task as complete" |
| Delete To-Do | Delete a task | "Remove that expired to-do" |
| Create Habit | Set up a habit tracker | "Help me build a daily running habit" |
| Complete Habit | Log a habit check-in | "Check in running for today" |
| Delete Habit | Remove a habit tracker | "Stop tracking the running habit" |
| Generate Image | Draw from a description | "Draw a cat on the moon" |
| Send Voice | AI speaks a message aloud | "Tell me today's schedule with voice" |

---

## How to Use

No special actions needed — just express your needs in conversation, and AI automatically decides whether to call a tool.

### Example Conversation

**You**: "Remind me to submit the report on Friday at 3 PM"

**AI**: Creates a to-do card:

> 📋 **Submit Report**
> Urgent & Important · 📅 Fri 15:00

**You**: "Help me build a habit of drinking 8 glasses of water daily"

**AI**: Creates a habit card:

> 🔄 **Drink 8 Glasses of Water Daily**
> Frequency: Daily · Target: 8 times

---

## To-Do Card Details

A to-do card contains:

| Field | Description |
|-------|-------------|
| Title | Task name |
| Note | Supplementary description |
| Priority | Urgent & Important / Important Not Urgent / Urgent Not Important / Not Urgent Not Important |
| Due Date | Task deadline |

Click **Confirm** on the card to save the to-do, or **Undo** to cancel.

---

## Habit Card Details

A habit card contains:

| Field | Description |
|-------|-------------|
| Name | Habit name |
| Frequency | Daily / Weekly / Monthly |
| Target Count | Number of times per cycle |

---

## Image Generation Card Details

When AI generates an image for you, it shows a generation card:

| Field | Description |
|-------|-------------|
| Prompt | The description AI uses to generate the image |
| Aspect Ratio | Image proportions (e.g. 1:1, 16:9) |
| Style | Artistic style of the image |

After generation, you can:
- Click the image to view full-size
- Long-press/right-click to save the image

---

## Undoing a Tool Call

If AI performed an action you didn't want:

1. Click the **"Undo"** button on the tool card
2. Or tell AI: "Delete the to-do you just created"

---

## Tips

- **Be specific**: Tell AI exact times, priorities, etc. for more accurate cards
- **Natural conversation**: No need for command formats — just talk naturally
- **Always editable**: After creation, you can ask AI to modify or delete at any time

:::tip
Tool calling is available at all subscription tiers, but some advanced tools (like image generation) may require a higher tier.
:::
