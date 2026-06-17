---
sidebar_position: 5
slug: /features/agent
title: AI Agent (Sub-Agent)
description: Let AI operate your computer, search information, and execute complex tasks
---

# AI Agent (Sub-Agent)

Eidolon's AI Agent feature goes beyond chatting — it can **operate your computer**, **search the web**, and **execute complex multi-step tasks** on your behalf.

:::info Subscription Requirement
The AI Agent feature is only available to **Genesis** tier subscribers. See [Subscription & Benefits](/features/subscription).
:::

---

## What Is an AI Agent?

AI Agent is Eidolon's "action" mode. When you give AI a task, it:

1. **Decomposes the task**: Breaks complex tasks into multiple steps
2. **Executes step by step**: Completes each operation in order
3. **Reports in real-time**: Shows execution progress and logs in the chat
4. **Returns results**: Reports the outcome when the task is complete

---

## How to Use

### Enable AI Agent

1. Go to **Settings → Preferences**
2. Find the **"AI Agent"** toggle and enable it (requires Genesis tier)

### Assign Tasks to AI

Tell AI what you want it to do in the chat:

- "Search for the recent weather trends"
- "Open the browser and check tomorrow's flights"
- "Help me organize the files on my desktop"

### Execution Process

When the AI Agent executes a task, the chat shows:

| Info | Description |
|------|-------------|
| Execution To-Dos | List of steps currently being executed |
| Phase | Current execution phase |
| Tool Calls | Tool name and parameters being invoked |
| Results | Execution result for each step |
| Thought Process | AI's reasoning and decision-making |

---

## Capabilities

The AI Agent can perform operations including:

### Information Search

- Web search (via Tavily search engine)
- Knowledge base queries (e.g. game guides)

### Computer Operations

- Browser automation (navigation, clicking, typing)
- Screen capture and analysis
- File operations

### Tool Integration

- MCP (Model Context Protocol) tool calls
- Custom tool extensions

---

## Execution Logs

Each AI Agent task generates detailed execution logs:

| Log Type | Description |
|----------|-------------|
| started | Task began |
| thought | AI's thinking process |
| tool_call | Invoking a tool |
| tool_result | Tool returned a result |
| completed | Task completed |
| error | Execution error |
| give_up | AI gave up the task |
| user_input | Needs user confirmation |

---

## Safety & Permissions

The AI Agent follows safety principles during execution:

- **Sensitive operations require confirmation**: Destructive actions like deletion or modification ask for your consent first
- **Operations are traceable**: All execution steps are logged
- **Can be interrupted anytime**: You can tell AI to stop at any point

:::caution
The AI Agent has the ability to operate your computer. Use it in a trusted environment only. Do not ask AI to perform operations that could cause data loss.
:::

---

## Common Issues

### AI Agent execution failed?
- Check your network connection
- Make sure the task description is clear
- Try simplifying the task and executing it step by step

### AI Agent too slow?
- Complex tasks require more steps — be patient
- You can tell AI to skip certain steps

### How to disable AI Agent?
Go to **Settings → Preferences** and turn off the "AI Agent" toggle.
