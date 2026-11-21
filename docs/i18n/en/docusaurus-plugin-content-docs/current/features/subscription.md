---
sidebar_position: 1
slug: /features/subscription
title: Plans, Echo and the Emergency Lantern
description: "Sholarel's five 31-day plans, Echo allowances, Emergency Lantern, Pure Companionship mode and Chrono Dew."
---

# Plans, Echo and the Emergency Lantern

Paid Sholarel plans use a **31-day period**. A plan mainly determines the default companion model, the Echo allowance for the period, and which advanced capabilities are available.

## Five plans

| Plan | Default model | Echo per period | CNY regular | USD regular |
|---|---|---:|---:|---:|
| Spark | DeepSeek | 1× | ¥29.9 | $9.99 |
| Resonance | Gemini 3.8 Flash | 8× | ¥118 | $18.00 |
| Genesis | Gemini 4 Argon | 41× | ¥598 | $89.00 |
| Symbiosis | Claude Opus 5.5 | 420× | ¥5,998 | $899.00 |
| Fable | Claude Fable 5.2 | 1,450× | ¥19,998 | $2,899.00 |

Spark costs ¥9.9 for the first period in CNY, and Resonance costs ¥78. A first-period offer is available once per account. Genesis, Symbiosis and Fable use their regular price.

CNY plans renew manually and never charge automatically. USD plans renew automatically and can be cancelled in the app; benefits remain active until the end of the paid period.

## Echo allowance

Echo is the unified meter for chat, voice, images, video, tool calls and background companionship features. Different operations consume different amounts. The period allowance is spent first; purchased Chrono Dew is only used after it runs out.

### Typical consumption multipliers

The table below is estimated from the last 30 days of production data, with one ordinary text chat as 1x at the P50 median:

| Operation | Multiplier |
|---|---:|
| Regular text chat | 1x |
| Voice message | ~1.3x |
| Multi-image chat | ~2x |
| Single TTS clip | ~0.5x |
| Web research | ~12x |
| Video call | ~14.5x/min |
| Voice call | ~2.9x/min |

Background features such as immediate summaries, session notes and memory reflection count toward the total allowance as they occur: immediate summaries and session notes each use roughly 5% of total consumption, yesterday summaries ~0.6%, memory reflection ~2%.

<p style="color: var(--ifm-color-emphasis-600); font-size: 0.85em; margin-top: -0.5rem;">Estimated from average user activity in the first two weeks after the 3.0 open beta, assuming the default tier-1 mind preset. Other presets or advanced tuning may cause small deviations.</p>

Open **Settings → Subscription & allowance** to see usage. The interface shows a usage ratio and estimated remaining time, not underlying provider prices.

## Emergency Lantern

When an active paid plan has used both its period Echo and Chrono Dew, a clearly visible **Emergency Lantern** begins:

- 10 text-only light-chat turns per calendar day, refreshed at **04:00 Asia/Shanghai**
- 5 turns per day in Pure Companionship mode
- Images, voice, stickers, video, attachments, calls, tools and long-memory retrieval are unavailable
- Ordinary long-term memory lookup remains available, without model-heavy reflection or memory-maintenance sidecars
- At most one immediate summary and one yesterday summary, each counted as a lantern turn
- At most one proactive message, also counted as a lantern turn
- Proactive notifications and email delivery continue
- Inner monologue and director progress remain visibly locked instead of expanding
- Summaries cannot be published as moments or trigger AI comments

Lantern requests use one fixed two-hop lightweight text-model chain. If both hops fail, the turn does not quietly fall back to a normal model or fabricate a successful SAFE response.

An expired subscription, disabled account or account that never subscribed does not receive the lantern. Chrono Dew or a plan upgrade restores full access immediately.

## Pure Companionship mode

Users can enable **Pure Companionship mode (data-saving)** in Settings:

- Keeps ordinary text chat, long-memory lookup, immediate and yesterday summaries, proactive messages, notifications, email, weather and location awareness
- Disables the turn director, suggested replies, nonessential memory reflection, AI journaling, automatic web research and other invisible background jobs
- Disables voice, stickers, images, video, attachments and calls; the model does not receive historical multimedia
- Reduces the Emergency Lantern to 5 turns per day

Existing model and feature preferences are not overwritten. Leaving Pure Companionship mode restores the previous configuration.

## Chrono Dew

Chrono Dew is a permanent extra Echo balance that requires an active subscription to buy and use.

| Base amount | CNY | USD |
|---:|---:|---:|
| 1 Dew | ¥9.9 | $1.99 |
| 4 Dew | ¥32 | $4.99 |
| 20 Dew | ¥128 | $19 |
| 80 Dew | ¥488 | $69 |
| 400 Dew | ¥2,198 | $319 |
| 1,000 Dew | ¥4,998 | $749 |

For the first purchase of each pack, the price stays the same and an equal Dew bonus is added — buy 4 and receive 8, for example. Eligibility is shared across CNY and USD per account and pack. An unpaid expired order does not consume it.

Dew does not raise the subscription tier and cannot unlock models or features above the current plan by itself.

## Switching and upgrading

Open **Settings → Subscription & allowance** to see the current plan, remaining days and available Echo. When upgrading, the unused portion of the current plan is credited by remaining days and only the difference is charged. The new plan takes effect immediately with a new 31-day period.

## FAQ

### What happens when Echo runs out?

An active paid plan retains the daily Emergency Lantern. Buying Chrono Dew or upgrading restores full companionship immediately; otherwise lantern turns refresh at 04:00 the next day.

### Will downgrading delete my data?

Features outside the current access level become unavailable, but not all historical data is deleted automatically. Different data types have different retention rules, so export or back up anything important before changing devices, uninstalling or leaving the service for a long period.

### Is there a free trial?

There is no free trial that unlocks the complete paid experience. The client download is free, and the pricing page clearly shows both first-period and regular renewal prices.
