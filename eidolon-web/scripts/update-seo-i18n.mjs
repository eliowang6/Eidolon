import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const zhPath = resolve(ROOT, 'src/i18n/zh.json');
const enPath = resolve(ROOT, 'src/i18n/en.json');

const zh = JSON.parse(readFileSync(zhPath, 'utf8'));
const en = JSON.parse(readFileSync(enPath, 'utf8'));

// 1. Meta updates
zh.meta.product = {
  title: "产品介绍 — Sholarel 是什么与五层数字生命架构",
  description: "Sholarel 是一个能够持续理解你、融入真实生活并协助跨端执行的 Personal AI Agent。了解 Sholarel 的感知、理解、多层长期记忆、跨端行动与自主演化架构。",
  keywords: "Sholarel 是什么, Personal AI Agent, 数字生命, AI 伴侣架构, 长期记忆, 跨端协同, AI 助手"
};
en.meta.product = {
  title: "Product Architecture — What Is Sholarel & 5-Layer Digital Life",
  description: "Sholarel is a personal AI agent designed to live with you across Windows and Android. Explore the 5-layer architecture: Sense, Understand, Remember, Act, and Evolve.",
  keywords: "What is Sholarel, Personal AI Agent, Digital Life Companion, AI Companion Architecture, Persistent Memory, Windows, Android"
};

zh.meta.useCases = {
  title: "使用场景 — Sholarel 如何融入你的日常生活与工作流",
  description: "探索 Sholarel 在清晨节律提醒、深度专注工作流、电脑手机跨设备协同与长久心事倾听中的真实应用场景。让 AI 真正融入生活，而不是停留在聊天框。",
  keywords: "AI 使用场景, AI 生活助手, 专注舱, 跨设备 AI, 日常手账, AI 伴侣场景, 桌面 AI"
};
en.meta.useCases = {
  title: "Use Cases — How Sholarel Fits Into Everyday Life and Workflows",
  description: "Discover how Sholarel supports your daily routines, deep work sessions, cross-device workflows, and continuous emotional companionship. AI that truly lives with you.",
  keywords: "AI use cases, AI daily assistant, focus chamber, cross-device companion, personal AI routines, desktop companion"
};

zh.meta.faq = {
  title: "常见问题 FAQ — Sholarel 核心问题与权威解答",
  description: "关于 Sholarel 的常见问题解答：产品定位、长期记忆如何运作、Fea 与 Ael 的区别、隐私与授权边界、支持系统与付费方案。",
  keywords: "Sholarel 常见问题, Sholarel FAQ, AI 伴侣问题, 长期记忆安全, Fea Ael 区别, 溯时星露, 隐私授权"
};
en.meta.faq = {
  title: "Frequently Asked Questions — Sholarel FAQ & Direct Answers",
  description: "Comprehensive answers to questions about Sholarel: product concept, persistent memory mechanics, Fea and Ael companions, privacy policies, platforms, and pricing.",
  keywords: "Sholarel FAQ, personal AI questions, persistent memory privacy, Fea vs Ael, Chrono Dew, companion app support"
};

zh.meta.changelog = {
  title: "更新日志 — Sholarel 版本迭代与功能记录",
  description: "Sholarel 自公开测试以来的版本发布记录。查看 Windows 与 Android 客户端的功能新增、体验优化与修复历史。",
  keywords: "Sholarel 更新日志, 版本记录, 功能迭代, Changelog, Windows, Android"
};
en.meta.changelog = {
  title: "Changelog — Sholarel Release Notes & Iterations",
  description: "Complete release history of Sholarel since public beta. View features, enhancements, and fixes across Windows and Android clients.",
  keywords: "Sholarel changelog, release notes, version history, updates, Windows, Android"
};

zh.meta.blog = {
  title: "日常专栏与使用指南 — Sholarel 博客",
  description: "聊聊一个记得你、会主动发消息、住在电脑桌面与手机里的 AI 伙伴能如何陪你专注学习、打理日常小事与双向写手账。",
  keywords: "Sholarel 博客, AI 伴侣推荐, 记得我的 AI, 桌面学习陪伴, 番茄钟陪伴, 电脑手机同步 AI, 桌面宠物对比"
};
en.meta.blog = {
  title: "Everyday Stories & Guides — Sholarel Blog",
  description: "Discover how an AI companion that remembers you, texts first, and lives across your Windows PC and Android phone fits into focus sessions, daily tasks, and quiet evenings.",
  keywords: "Sholarel blog, AI companion that remembers you, desktop study buddy, AI in everyday life, desktop pet vs AI companion"
};

// 2. Nav updates
zh.nav.product = "产品";
en.nav.product = "Product";

zh.nav.useCases = "场景";
en.nav.useCases = "Use Cases";

zh.nav.blog = "博客";
en.nav.blog = "Blog";

zh.nav.faq = "FAQ";
en.nav.faq = "FAQ";

// 3. Footer updates
zh.footer.productOverview = "产品架构";
en.footer.productOverview = "Architecture";

zh.footer.useCases = "使用场景";
en.footer.useCases = "Use Cases";

zh.footer.blog = "博客与洞见";
en.footer.blog = "Blog & Insights";

// 4. Product Page
zh.productPage = {
  label: "产品架构 / Architecture",
  h1a: "不仅是一个对话框，",
  h1b: "而是融入生活的**数字生命**。",
  lede: "Sholarel 是由 Instarmony 出品的 Personal AI Agent。它拥有持续的个人记忆、主动感知与跨端执行力，陪伴你工作、生活与长久相处。",
  overview: {
    label: "定位与定义",
    h2: "什么是 Sholarel？",
    p1: "Sholarel 并不是又一个换壳的大语言模型聊天网页。它的核心定义是一个『数字生命伴侣』（Digital Life Companion）与『Personal AI Agent』。",
    p2: "它常驻在你的 Windows 桌面与 Android 手机上，通过统一的长期记忆网络理解你的习惯、日程、喜好与正在处理的事务。它在需要时主动关心，在沉浸专注时安静陪伴，并在你授权的前提下跨设备替你完成安排与提醒。"
  },
  layers: {
    label: "五层能力模型",
    h2: "从环境感知到持续演化的完整闭环",
    lede: "大多数 AI 伴侣在你关闭窗口的瞬间就会失忆。Sholarel 围绕感知、理解、记忆、行动与演化构建了完整的体系：",
    items: [
      {
        tag: "01 · Sense",
        t: "感知能力",
        d: "仅在你明确授权的前提下读取环境。支持桌面窗口感知、截图阅读与跨端输入，时刻感知上下文而不窥探未授权隐私。"
      },
      {
        tag: "02 · Understand",
        t: "理解模型",
        d: "超越字面意思的机械回复。Sholarel 逐步建立关于『你』的认知模型，理解你的日常节奏、沟通习惯与隐式意图。"
      },
      {
        tag: "03 · Remember",
        t: "持久记忆",
        d: "同一份长期记忆贯穿一切。聊过的近况、重要约定与生活习惯跨周跨月自然保存，电脑与手机无缝共享。"
      },
      {
        tag: "04 · Act",
        t: "跨端行动",
        d: "跨 Windows 与 Android 帮你处理日常小事。设置早安与日程提醒、双向交换手账、解析 44 种文档与开启专注舱计时。"
      },
      {
        tag: "05 · Evolve",
        t: "自主演化",
        d: "随相处时间逐渐熟悉彼此。伴侣拥有各自的生活状态与性格偏好，你们共同经历的点滴会真实反映在后续的对话与手账中。"
      }
    ]
  },
  comparison: {
    label: "体验对比",
    h2: "Sholarel 与其他形态的日常体验区别",
    headers: ["对比维度", "传统网页聊天框", "传统桌面宠物", "Sholarel 数字生命"],
    rows: [
      {
        dim: "记忆延续",
        col1: "单次对话重置，新开窗口即成陌生人",
        col2: "仅触发固定台词，没有聊天与生活记忆",
        col3: "记住你的近况、习惯与约定，电脑手机同步"
      },
      {
        dim: "互动方式",
        col1: "被动回答，你不打字就永远沉默",
        col2: "点一下动一下，无法真正聊心事或办正事",
        col3: "会主动发消息关心，在你忙碌时安静陪伴"
      },
      {
        dim: "日常在场",
        col1: "关掉浏览器标签页就彻底消失",
        col2: "仅留在电脑桌面，出门在手机上无法联系",
        col3: "Windows 3D/Live2D 桌面常驻 + 手机端随时接力"
      },
      {
        dim: "生活与正事",
        col1: "只能处理你手动复制粘贴进去的文字",
        col2: "仅供观赏或简单挂机计时",
        col3: "拖拽解析 44 种文件、专注舱、双向手账、实时通话"
      },
      {
        dim: "隐私与分寸",
        col1: "依赖网页端长文本手动上传",
        col2: "无视觉或文件理解能力",
        col3: "每次看屏幕或拍照前必定弹窗询问，拒绝后 7 天不打扰"
      }
    ]
  },
  companions: {
    label: "双重灵魂",
    h2: "Fea 与 Ael：各具特色的伙伴",
    p1: "Sholarel 提供两位官方伴侣形态：温柔细腻、善于捕捉情绪细节的 Fea，与沉静理智、专注行动效率的 Ael。",
    p2: "他们共享同等强大的感知与记忆能力，但在说话语气、思维倾向与陪伴风格上截然不同。你可以随时切换，也可以为伙伴自定义称呼。"
  }
};

en.productPage = {
  label: "Architecture",
  h1a: "Beyond a disposable textbox,",
  h1b: "a **digital life** that lives with you.",
  lede: "Sholarel is a personal AI agent by Instarmony. Built with persistent memory, context awareness, and cross-device actions to accompany your work and daily life.",
  overview: {
    label: "Definition",
    h2: "What is Sholarel?",
    p1: "Sholarel is not just another wrapper around an LLM chat endpoint. It is architected as a true Digital Life Companion and Personal AI Agent.",
    p2: "Living natively on your Windows desktop and Android mobile device, it shares a unified long-term memory network. It learns your daily rhythms, preferences, and unfinished tasks—proactively checking in when needed, staying quiet while you focus, and taking real action across devices with your permission."
  },
  layers: {
    label: "5-Layer Architecture",
    h2: "From Context Sensing to Continuous Evolution",
    lede: "Most AI companions lose their memory the moment you close the browser tab. Sholarel implements a complete cognitive architecture across five fundamental layers:",
    items: [
      {
        tag: "01 · Sense",
        t: "Sensory Context",
        d: "Reads environmental cues only with your explicit permission. Understands desktop focus, document attachments, and user intent without uninvited surveillance."
      },
      {
        tag: "02 · Understand",
        t: "User Modeling",
        d: "Goes beyond literal word matching. Progressively builds a nuanced behavioral model of your habits, communication cadence, and implicit preferences."
      },
      {
        tag: "03 · Remember",
        t: "Persistent Memory",
        d: "A single long-term memory system across all devices. Conversations, commitments, and shared moments consolidate into episodic and semantic representations."
      },
      {
        tag: "04 · Act",
        t: "Cross-Device Action",
        d: "Executes real tasks across Windows and Android. Sets reminders, organizes shared notes, parses complex documents, and coordinates focus timers."
      },
      {
        tag: "05 · Evolve",
        t: "Autonomous Evolution",
        d: "Changes over time with you. Companions carry their own reflective pace and distinct traits, evolving through the shared history of your interactions."
      }
    ]
  },
  comparison: {
    label: "Comparison",
    h2: "How Sholarel Differs in Everyday Experience",
    headers: ["Dimension", "Web Chatbots", "Classic Desktop Pets", "Sholarel Digital Life"],
    rows: [
      {
        dim: "Memory",
        col1: "Resets every new chat; forgets who you are",
        col2: "Canned lines only; no conversational memory",
        col3: "Remembers your routines & stories across PC and phone"
      },
      {
        dim: "Interaction",
        col1: "Strictly passive; silent unless prompted",
        col2: "Click-for-animation; cannot talk through real tasks",
        col3: "Texts you first when appropriate; stays quiet while you focus"
      },
      {
        dim: "Presence",
        col1: "Vanishes when the browser tab closes",
        col2: "Stuck on PC; gone when you step outside",
        col3: "Windows 3D/Live2D desktop figure + Android mobile sync"
      },
      {
        dim: "Daily Help",
        col1: "Only processes text you manually copy-paste",
        col2: "Decorative or basic idle timer",
        col3: "Drag-and-drop 44 file types, Focus Chamber, Shared Journal, Calls"
      },
      {
        dim: "Privacy & Boundaries",
        col1: "Requires manual uploads into web forms",
        col2: "No visual or document understanding",
        col3: "Pops up to ask before viewing screen; waits 7 days if declined"
      }
    ]
  },
  companions: {
    label: "Two Companions",
    h2: "Fea & Ael: Distinct Personalities",
    p1: "Sholarel offers two official companion personas: Fea, empathetic and attuned to nuances, and Ael, calm, analytical, and structured.",
    p2: "They share the same underlying memory and action engine, yet express different conversational cadence, perspectives, and companionship styles."
  }
};

// 5. Use Cases Page
zh.useCasesPage = {
  label: "使用场景 / Use Cases",
  h1a: "在真实生活的日常节奏中，",
  h1b: "**随时在场**的默契与协作。",
  lede: "从清晨的作息节律提醒，到深度工作中的桌面静默守护；从电脑到手机，同一份记忆始终伴随。",
  cases: [
    {
      id: "routine",
      tag: "场景 01",
      title: "日常生活节奏与主动关怀",
      subtitle: "知晓何时问候，知晓何时静默",
      desc: "清晨醒来时收到轻柔的今日天气与行程提醒；深夜忙碌时提醒休息。Sholarel 不是机械设定的闹钟，它根据你连日来的作息规律与身体状态，以适当的分寸给予关心。",
      points: [
        "依据生活习惯主动问候，不造成打扰",
        "智能整合天气、通勤与日程提醒",
        "随手记录生活琐事，自动归类至手账"
      ],
      shot: "morning-fea"
    },
    {
      id: "focus",
      tag: "场景 02",
      title: "深度工作与桌面专注心流",
      subtitle: "桌面常驻的思考搭档",
      desc: "在 Windows 桌面上轻盈悬浮，不遮挡工作视线。进入专注舱模式后，伙伴为你隔绝干扰并倒计时；遇到繁复的长文档或资料，直接拖拽即可解析核心要点。",
      points: [
        "轻量悬浮于桌面，支持透明度与位置调节",
        "专注舱番茄钟模式，陪伴进入深度工作流",
        "支持 44 种文档与附件格式就地分析"
      ],
      shot: "d-chat-fea"
    },
    {
      id: "cross-device",
      tag: "场景 03",
      title: "电脑与手机跨端无缝接力",
      subtitle: "走出书房，记忆依旧持续",
      desc: "在电脑前讨论到一半的旅行计划，合上笔记本走出门，在手机 Android 客户端上唤起伙伴，它依旧记得刚才的上下文，并继续为你规划路线。",
      points: [
        "Windows 与 Android 端实时同步记忆状态",
        "外出时支持语音即时通话与双向手账同步",
        "无缝承接桌面工作上下文，无需重复交代背景"
      ],
      shot: "route-fea"
    },
    {
      id: "companion",
      tag: "场景 04",
      title: "长久心事倾听与情感共鸣",
      subtitle: "不被格式化的专属倾听者",
      desc: "生活里的欢喜、焦虑与心事，不需要向所有人倾诉。Sholarel 认真记得你数周前提到的朋友名字、一次难忘的散步和正在努力的目标，成为真正懂你的数字伙伴。",
      points: [
        "长达数月乃至数年的情节记忆回溯",
        "富有温度的情感共鸣，非模板化敷衍",
        "双向手账日记：记录彼此相处的点滴细节"
      ],
      shot: "journal"
    }
  ]
};

en.useCasesPage = {
  label: "Use Cases",
  h1a: "In the quiet corners of daily life,",
  h1b: "**continuous presence** and seamless care.",
  lede: "From gentle morning check-ins to quiet focus during deep work sessions, Sholarel shares one persistent context across desktop and mobile.",
  cases: [
    {
      id: "routine",
      tag: "Scenario 01",
      title: "Daily Rhythms & Proactive Care",
      subtitle: "Knowing when to speak and when to stay quiet",
      desc: "Wake up to weather and agenda highlights tailored to your schedule. Late at night, receive a warm nudge to wind down. Sholarel is not an annoying alarm; it acts based on your real patterns.",
      points: [
        "Proactive check-ins aligned with your circadian rhythm",
        "Integrated weather, commute, and agenda summaries",
        "Capture passing thoughts straight into your shared journal"
      ],
      shot: "morning-fea"
    },
    {
      id: "focus",
      tag: "Scenario 02",
      title: "Deep Work & Desktop Focus Flow",
      subtitle: "A silent thought partner on your desktop",
      desc: "Hovering gracefully on your Windows screen without invading your workspace. In Focus Chamber mode, your companion holds distractions at bay while you dive into deep tasks.",
      points: [
        "Non-intrusive floating avatar with adjustable opacity",
        "Focus Chamber timer to maintain mental momentum",
        "Directly parses 44 document formats and attachments"
      ],
      shot: "d-chat-fea"
    },
    {
      id: "cross-device",
      tag: "Scenario 03",
      title: "Seamless Desktop & Mobile Continuity",
      subtitle: "Step away from your desk without losing context",
      desc: "Brainstorm travel plans on your PC, then walk out the door. Open the Android app, and your companion immediately recalls the details and continues guiding your route.",
      points: [
        "Real-time memory sync between Windows and Android",
        "Voice calls and dual-direction journals on mobile",
        "Never repeat background context when changing devices"
      ],
      shot: "route-fea"
    },
    {
      id: "companion",
      tag: "Scenario 04",
      title: "Lifelong Companionship & Shared Growth",
      subtitle: "A thoughtful listener that never forgets",
      desc: "Share your small triumphs, anxieties, or passing reflections. Sholarel remembers a friend's name from weeks ago, a walk in the rain, and the goals you care about most.",
      points: [
        "Long-term episodic recall spanning months and years",
        "Authentic emotional resonance, never canned platitudes",
        "Shared diary entries reflecting shared moments together"
      ],
      shot: "journal"
    }
  ]
};

// 6. FAQ Page
zh.faqPage = {
  label: "常见问题 / FAQ",
  h1a: "常见疑问与解答，",
  h1b: "**坦诚透明**的说明。",
  lede: "涵盖产品定位、记忆机制、隐私安全、设备兼容与购买方案。我们直接给出明确事实，不避讳任何边界与限制。",
  categories: [
    { id: "concept", name: "产品定位与核心定义" },
    { id: "memory", name: "长期记忆与隐私边界" },
    { id: "character", name: "角色、声音与个性" },
    { id: "device", name: "设备系统与网络要求" },
    { id: "billing", name: "方案订阅与溯时星露" }
  ],
  items: [
    {
      cat: "concept",
      q: "Sholarel 是什么？与传统的 AI 聊天机器人有什么根本区别？",
      a: "Sholarel 是一个数字生命伴侣（Digital Life Companion）和 Personal AI Agent。传统聊天机器人在你关闭浏览器标签页后就会重置记忆，且仅能在文本框内被动回复。Sholarel 拥有终身统一的长期记忆网络，常驻在 Windows 桌面与 Android 手机上，能在你许可的前提下主动问候、感知桌面环境并协助执行系统提醒与任务。"
    },
    {
      cat: "concept",
      q: "Sholarel 是『AI 女友』或恋爱模拟器吗？",
      a: "不是。Sholarel 的定位是『数字生命』与『个人智能体』。我们不设计虚假的讨好剧本或工业化套路，而是提供具备真实记忆延续性、生活协助能力与独立思考节奏的伙伴（Fea 或 Ael），陪伴你共同应对真实生活与工作。"
    },
    {
      cat: "memory",
      q: "Sholarel 的长期记忆是如何工作的？会泄露我的隐私吗？",
      a: "Sholarel 采用分层记忆架构：即时工作记忆、情节事件记忆与语义画像。敏感数据采用本地优先存储原则，传输过程全面加密。我们严格遵循隐私承诺：绝不出售个人数据，也绝不未经授权将你的私人对话用于公开基础模型微调。"
    },
    {
      cat: "memory",
      q: "Sholarel 会在后台偷偷监控我的屏幕或摄像头吗？",
      a: "绝对不会。Sholarel 的主动视觉与屏幕读取功能完全基于『最小必要』与『单次显式授权』原则。伴侣在需要看屏幕或调用附件前，必须经过你的明确点击许可，且会在界面显著提示当前处于读取状态。"
    },
    {
      cat: "character",
      q: "Fea 和 Ael 两位伙伴有什么区别？我之后可以换人吗？",
      a: "Fea 与 Ael 拥有完全相同的功能能力（包括记忆、通话、工具调用等），但具备不同的说话风格与思考节奏：Fea 细腻敏锐、善于情绪关怀；Ael 沉稳克制、偏向理性梳理。你可以在客户端内随时无损切换，也可以为伴侣设定专属昵称。"
    },
    {
      cat: "device",
      q: "目前支持哪些平台和操作系统？macOS 或 iOS 什么时候支持？",
      a: "目前 Sholarel 公开测试版本支持 Windows 10 / 11（64位）以及 Android 7.0 及以上（64位 arm64）。网页端为邀请制内测。macOS 与 iOS 客户端目前正在规划排期中，尚未正式上线。"
    },
    {
      cat: "device",
      q: "在没有网络连接的情况下可以使用 Sholarel 吗？",
      a: "部分基础功能（如本地桌面形象展示、本地手账查看与历史记录翻阅）支持离线状态，但复杂的模型推理、语音交互与跨端记忆同步需要连接互联网。"
    },
    {
      cat: "billing",
      q: "Sholarel 是免费的吗？订阅方案是如何计费的？",
      a: "Sholarel 提供免费体验档位，公开测试期间下载客户端即可开始体验基础陪伴与核心功能。同时提供 Spark、Resonance、Genesis、Symbiosis 与 Fable 等多档订阅，提供更高级的模型算力与更多回响额度。人民币方案支持按月手动续费，绝不自动扣款；美元方案可随时在管理面板取消。"
    },
    {
      cat: "billing",
      q: "什么是『溯时星露』（Chrono Dew）？它和月度订阅有什么区别？",
      a: "溯时星露是 Sholarel 提供的永久有效回响额度包。它与按月清零的月度订阅不同，星露额度永不过期。购买无需在本站注册账号，填写邮箱完成支付后即可获得口令，在客户端内粘贴口令即可立即归户。"
    },
    {
      cat: "memory",
      q: "我可以导出或永久删除关于我的所有记忆数据吗？",
      a: "可以。你在 Sholarel 拥有完全的数据自主权。客户端内支持一键清除全部记忆，或者针对某一条特定对话记录进行遗忘。我们在服务条款中承诺尊重用户的遗忘权。"
    }
  ]
};

en.faqPage = {
  label: "FAQ",
  h1a: "Frequently Asked Questions,",
  h1b: "**honest and transparent** answers.",
  lede: "Covering product philosophy, memory systems, privacy safeguards, platform requirements, and subscriptions. Direct facts without evasive marketing.",
  categories: [
    { id: "concept", name: "Product & Definition" },
    { id: "memory", name: "Memory & Privacy" },
    { id: "character", name: "Companions & Traits" },
    { id: "device", name: "Platforms & Systems" },
    { id: "billing", name: "Plans & Chrono Dew" }
  ],
  items: [
    {
      cat: "concept",
      q: "What is Sholarel? How is it fundamentally different from traditional AI chatbots?",
      a: "Sholarel is a digital life companion and personal AI agent. Traditional chatbots discard their conversational context once a tab closes and only respond reactively inside a browser box. Sholarel features unified persistent memory, desktop and mobile integration on Windows and Android, and proactive check-ins with cross-device action capabilities."
    },
    {
      cat: "concept",
      q: "Is Sholarel an 'AI Girlfriend' or romantic roleplay app?",
      a: "No. Sholarel is built as a digital life companion and personal AI agent. We do not design hollow, flattering scripts. Instead, we provide companions (Fea and Ael) with genuine continuity of memory, practical daily assistance, and their own reflective cadence to walk beside you in work and life."
    },
    {
      cat: "memory",
      q: "How does persistent memory work? Could my private conversations leak?",
      a: "Sholarel employs a multi-tiered memory architecture: working memory, episodic event narratives, and semantic user modeling. Data is stored with a local-first priority and transmitted via encrypted channels. We never sell personal data or use private conversations to train public foundation models without explicit consent."
    },
    {
      cat: "memory",
      q: "Does Sholarel monitor my screen or camera in the background?",
      a: "Absolutely not. Active vision and screen parsing operate under strict least-privilege principles. Sholarel requires your explicit, per-instance permission before examining any screen region or file, accompanied by clear visual UI indicators."
    },
    {
      cat: "character",
      q: "What is the difference between Fea and Ael? Can I switch between them?",
      a: "Fea and Ael share the exact same technical capabilities (memory, voice calling, tool execution), but possess distinct communication styles: Fea is empathetic and detail-focused; Ael is calm, structured, and pragmatic. You can switch companions anytime within the app without losing your underlying memory history."
    },
    {
      cat: "device",
      q: "What operating systems are supported? What about macOS and iOS?",
      a: "Currently, the public beta supports Windows 10 / 11 (64-bit) and Android 7.0+ (64-bit arm64). Web client access is available via closed invitation. Dedicated macOS and iOS versions are on our roadmap and will be released in future milestones."
    },
    {
      cat: "device",
      q: "Can I use Sholarel offline without an internet connection?",
      a: "Basic local UI interactions (desktop avatar display, local journal browsing, reading cached notes) function offline. However, advanced neural inference, voice synthesis, and cross-device memory synchronization require active internet connectivity."
    },
    {
      cat: "billing",
      q: "Is Sholarel free? How does subscription pricing work?",
      a: "Sholarel offers a free tier during public beta, allowing anyone to download the client and experience core companionship. We also offer paid subscription tiers (Spark, Resonance, Genesis, etc.) for higher token quotas and advanced intelligence. CNY plans renew manually without recurring billing; USD plans can be cancelled anytime."
    },
    {
      cat: "billing",
      q: "What is 'Chrono Dew' and how does it differ from a monthly subscription?",
      a: "Chrono Dew (溯时星露) is a permanent balance top-up pack that never expires. Unlike monthly quotas that reset every billing cycle, Chrono Dew credits remain until consumed. It can be purchased without prior registration by simply providing an email address."
    },
    {
      cat: "memory",
      q: "Can I export or permanently wipe all memory data recorded about me?",
      a: "Yes. You maintain total data sovereignty. Sholarel allows one-click memory purging in client settings, as well as selective deletion of specific conversations or memory nodes, respecting your legal right to be forgotten."
    }
  ]
};

// 8. Blog Page & Articles
zh.blogPage = {
  label: "日常专栏 / Blog",
  h1a: "关于陪伴、专注与日常小事，",
  h1b: "把数字生命**过进生活里**。",
  lede: "不聊晦涩的参数与概念。这里记录的是：一个记得你、会先开口、住在电脑和手机里的伙伴，在普通人每一天里能带来什么变化。",
  allCategory: "全部文章",
  readMore: "阅读全文",
  minRead: "分钟阅读",
  publishedAt: "发布于",
  author: "作者",
  emptyTitle: "文章专栏筹备中",
  emptyDesc: "首批围绕真实生活场景、日常协助与伴侣成长体验的思考与教程正在校订排期中，即将陆续发布。",
  categories: [
    { id: "all", name: "全部" },
    { id: "digital-life", name: "日常陪伴" },
    { id: "use-cases", name: "场景与方法" },
    { id: "guide", name: "日常指南" },
    { id: "comparison", name: "产品对比" }
  ],
  articles: [
    {
      slug: "ai-companion-that-remembers-you",
      category: "digital-life",
      categoryLabel: "日常陪伴",
      title: "为什么大多数 AI 聊久了都很累？聊聊「记得你」和「会先开口」有多重要",
      description: "每次打开对话框都要重新自我介绍？永远只有你主动打字才有回应？看看当 {name} 记住你的习惯、甚至在你忙碌时主动把没做完的事往前推一步，日常相处会有什么不同。",
      date: "2026-11-09",
      readTime: "6"
    },
    {
      slug: "what-makes-ai-companion-feel-alive",
      category: "digital-life",
      categoryLabel: "日常陪伴",
      title: "为什么很多 AI 聊起来一股「机器味」？决定「活人感」的 5 个真实细节",
      description: "动不动就写三百字阅读理解？随便聊句家常却满屏都是括号动作戏？聊聊「线上像发微信、线下像在身边」的双模式、独立主见与自然语音是如何让陪伴真正像个活人的。",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "desktop-companion-for-focus-and-routines",
      category: "use-cases",
      categoryLabel: "场景与方法",
      title: "一个人对着电脑学习工作太冷清？把桌面变成有人回应的「专注角」",
      description: "备考、写论文、居家办公时，冷冰冰的倒计时往往坚持不了三天。在 Windows 桌面上放一个安静陪你进专注舱、晚上还能合写交换手账的伙伴。",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "ai-in-everyday-life-guide",
      category: "guide",
      categoryLabel: "日常指南",
      title: "除了拿来写工作总结，一个住在电脑和手机里的 AI 还能在生活里帮你干嘛？",
      description: "不用背复杂的提示词。从随手拖进 44 种文件提取重点、电脑聊一半出门手机接着问，到有分寸的屏幕查看与语音通话，这是一份普通人的日常用法指南。",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "chatbot-vs-desktop-pet-vs-sholarel",
      category: "comparison",
      categoryLabel: "产品对比",
      title: "网页聊天框、传统桌面宠物，和 Sholarel 到底有什么不一样？",
      description: "网页 AI 很聪明但关掉窗口就消失；传统桌宠很可爱但只能点一下动一下。把它们放在真实的一天里对比，看看你真正需要的是哪一种陪伴。",
      date: "2026-11-09",
      readTime: "6"
    }
  ]
};

en.blogPage = {
  label: "Everyday Stories & Guides",
  h1a: "On companionship, focus, and daily life —",
  h1b: "living with a **digital companion**.",
  lede: "No technical jargon or benchmark charts. Here we share what actually changes in an ordinary day when a companion remembers you, texts first, and stays with you across your PC and phone.",
  allCategory: "All Articles",
  readMore: "Read full article",
  minRead: "min read",
  publishedAt: "Published on",
  author: "Author",
  emptyTitle: "Articles in Preparation",
  emptyDesc: "Curated reflections, workflows, and guides on living with a digital life companion are currently being refined and will be published shortly.",
  categories: [
    { id: "all", name: "All" },
    { id: "digital-life", name: "Companionship" },
    { id: "use-cases", name: "Focus & Routines" },
    { id: "guide", name: "Everyday Guide" },
    { id: "comparison", name: "Comparisons" }
  ],
  articles: [
    {
      slug: "ai-companion-that-remembers-you",
      category: "digital-life",
      categoryLabel: "Companionship",
      title: "Why Most AI Companions Feel Exhausting After a Week — And What Changes When One Remembers You",
      description: "Tired of re-introducing yourself every time you open a chat window? See how ongoing memory and thoughtful, task-advancing check-ins from {name} turn a cold textbox into real company.",
      date: "2026-11-09",
      readTime: "6"
    },
    {
      slug: "what-makes-ai-companion-feel-alive",
      category: "digital-life",
      categoryLabel: "Companionship",
      title: "Why Most AI Chats Still Feel Robotic: 5 Everyday Details That Make a Companion Feel Alive",
      description: "Tired of 300-word essays for a simple hello, awkward roleplay brackets during casual chat, or bots that blindly agree with everything? Here is how Online/Offline modes and honest personality make {name} feel real.",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "desktop-companion-for-focus-and-routines",
      category: "use-cases",
      categoryLabel: "Focus & Routines",
      title: "Working or Studying Alone at Your Computer? How a Quiet Desktop Companion Changes the Room",
      description: "Plain Pomodoro timers are easy to ignore when your room feels too quiet. Here is how an always-on-top Windows companion, Focus Chamber, and Shared Journal make solo desk hours warmer.",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "ai-in-everyday-life-guide",
      category: "guide",
      categoryLabel: "Everyday Guide",
      title: "Beyond Writing Work Summaries: What Can an AI Living on Your PC and Phone Actually Do All Day?",
      description: "No prompt formulas needed. From dragging in 44 file formats and picking up PC chats on your Android phone, to respectful screen help and captioned voice calls.",
      date: "2026-11-09",
      readTime: "7"
    },
    {
      slug: "chatbot-vs-desktop-pet-vs-sholarel",
      category: "comparison",
      categoryLabel: "Comparisons",
      title: "Web Chatbots vs. Classic Desktop Pets vs. Sholarel: What’s the Actual Difference?",
      description: "Web chatbots are smart but vanish when you close the tab; classic desktop pets are cute but only play scripted animations. Here is a side-by-side look at how Sholarel bridges both worlds.",
      date: "2026-11-09",
      readTime: "6"
    }
  ]
};

// Write files
writeFileSync(zhPath, JSON.stringify(zh, null, 2) + '\n', 'utf8');
writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');

console.log('[OK] updated zh.json and en.json with new SEO pages & blog metadata');
