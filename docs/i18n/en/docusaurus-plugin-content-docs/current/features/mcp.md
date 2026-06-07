---
sidebar_position: 5
slug: /features/mcp
title: MCP Tool Extensions
description: Extend AI's capabilities through the MCP protocol
---

# MCP Tool Extensions

MCP (Model Context Protocol) is Eidolon's tool extension mechanism. By configuring MCP servers, you can give AI additional capabilities like accessing databases, calling external APIs, and more.

:::info For Advanced Users
MCP configuration requires some technical background. If you're unfamiliar with JSON configuration and command lines, feel free to skip this chapter.
:::

---

## What Is MCP?

MCP is a standardized protocol that enables AI to call external tools. Think of it as installing "plugins" for AI:

- Configure an MCP server = Add a new capability to AI
- AI automatically decides when to call these tools during conversations
- Tool execution results are returned to the conversation

---

## Configuring MCP

1. Go to **Settings → MCP**
2. Enter MCP configuration in the JSON editor
3. Click **Save**
4. Click **Start** to run the configured servers

### Configuration Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "path/to/executable",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR_NAME": "value"
      }
    }
  }
}
```

### Configuration Example

```json
{
  "mcpServers": {
    "my-search": {
      "command": "npx",
      "args": ["-y", "@example/mcp-search"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

---

## Managing MCP Servers

| Action | Description |
|--------|-------------|
| Save Config | Save JSON configuration locally |
| Start Servers | Run all configured MCP servers |
| Stop Servers | Stop running MCP servers |
| View Status | Check each server's running status |

---

## Security Notes

:::warning
- MCP servers run in your local environment — only configure servers you trust
- Do not expose sensitive information (like API keys) in the configuration
- Environment variable secrets are stored locally only and are not uploaded to the server
:::

---

## Common Issues

### MCP server failed to start?
- Check that the `command` path is correct
- Confirm `args` parameters are correct
- Verify environment variables are set completely

### AI not calling MCP tools?
- Confirm the server is running
- Try explicitly prompting AI to use a specific tool in conversation
- Check that tool descriptions are clear
