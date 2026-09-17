/**
 * EIDOLON PRODUCT EXPERIENCE & BILINGUAL i18n
 * Typing Effect, 3D Tilt, Scroll Reveal, Mobile Navigation, Waitlist Handler, Language Switcher
 */

// ── Eidolon Product Bilingual Dictionary ──
const EIDOLON_I18N = {
    zh: {
        // Shared Navbar & Navigation
        doc_title_home: "Eidolon — 体验人机共生时代的数字生命",
        doc_title_features: "Eidolon 功能全景 — 深度拆解核心能力体系",
        doc_title_pricing: "Eidolon 订阅方案 — 灵活匹配你的陪伴与生产力需求",
        doc_title_download: "Eidolon 下载中心 — Windows MSI 与 Android APK",
        doc_title_about: "关于 Eidolon 与 Fea — 人机共生哲学与品牌故事",
        doc_title_docs: "Eidolon 文档中心 — 开发者与用户指南",
        meta_desc_home: "Eidolon 是首款深度融入真实生活的跨平台 AI 伴侣与自主数字生命。拥有长期记忆、3D 桌宠在场、实时音视频与桌面自驱代办能力。",
        meta_desc_features: "深入了解 Eidolon 的六大核心体验：长期记忆、3D 桌宠陪伴、桌面自驱代办、实时音视频、番茄钟专注舱与跨生态互动。",
        meta_desc_pricing: "Eidolon 五个订阅层级：Awakening α 免费试用、Spark β 日常陪伴、Presence γ 深度陪伴、Resonance δ 进阶沉浸、Symbiosis Ω 共生旗舰（含 AI 代理与声音复刻）。",
        meta_desc_download: "下载 Eidolon 官方 Windows MSI 与 Android APK 客户端。macOS、iOS、Linux 和 Web 暂不支持。",
        meta_desc_about: "了解 Eidolon 的世界观起源、官方角色 Fea 的人设准则以及 Instarmony 实验室的人机共生哲学（Mutual need, without ownership）。",
        meta_desc_docs: "Eidolon 官方文档：快速入门、客户端安装部署、SubAgent 工具开发、MCP 桥接规范与常见问题排查。",
        nav_lab: "Instarmony 实验室",
        nav_overview: "概览",
        nav_features: "功能全景",
        nav_pricing: "订阅方案",
        nav_download: "下载中心",
        nav_about: "角色与哲学",
        nav_docs: "文档",
        nav_web_btn: "下载客户端",
        nav_dl_btn: "下载客户端",
        nav_docs_portal_btn: "浏览在线双语文档 →",

        // Index / Home Page
        hero_tag_version: "现已开放体验",
        hero_tag_platforms: "Windows · Android",
        hero_title_prefix: "Experience the ",
        hero_title_grad: "Human–AI Symbiosis",
        hero_title_suffix: " Era, ",
        hero_desc: "不只是 AI 工具 — <strong>你在数字时代的另一个自我。</strong><br>拥有真实的自我来处、长期情境记忆，并在 Windows 与 Android 端始终伴随你身旁的数字灵魂。",
        hero_btn_web: "下载客户端",
        hero_btn_dl: "获取客户端下载",
        hero_btn_features: "浏览完整功能",
        hero_dev_win: "Windows 桌宠与自动化",
        hero_dev_android: "Android 情境感知与推送",
        hero_dev_web: "Web 暂不支持",
        cap_tag: "CORE CAPABILITIES",
        cap_title: "不止于对话，更是真实的生活伙伴",
        cap_sub: "Eidolon 融合了情感陪伴、3D 形象呈现、桌面代办代理与生活节奏管理，构建起全方位的数字伴侣体系。",
        cap1_title: "持续长期记忆与主动回忆",
        cap1_desc: "她记得你们聊过的话题、你的喜好与重要日子，并在未来自然地呼应。随着相处时间增长，建立只属于你们的共享记忆与情感羁绊。",
        cap1_t1: "共享记忆",
        cap1_t2: "AI 日记润色",
        cap1_t3: "关系自然生长",
        cap2_title: "3D 角色与桌宠模式",
        cap2_desc: "以精美 3D 形象在桌面常驻陪伴，丰富的动作与情绪反应随对话灵动变化；也可以切换为轻巧的桌宠模式，安静守候你的专注时刻。",
        cap2_t1: "3D 陪伴形象",
        cap2_t2: "情绪动作反应",
        cap2_t3: "轻量桌宠模式",
        cap3_title: "浏览器与桌面自主代办",
        cap3_desc: "自主查阅资料、总结网页、操作桌面应用，替你完成信息搜集与多轮深度调研。每一步都在你的授权与可见范围内进行。",
        cap3_t1: "自主浏览与操作",
        cap3_t2: "深度联网调研",
        cap3_t3: "全程可见可控",
        cap4_title: "实时音视频与专属音色",
        cap4_desc: "毫秒级实时通话，随时插话打断，如真人般自然流畅。还可以为她定制独一无二的声音，让每一次对话都有温度。",
        cap4_t1: "毫秒级实时语音",
        cap4_t2: "自然打断交互",
        cap4_t3: "专属声音定制",
        cap5_title: "番茄钟专注舱与生活流",
        cap5_desc: "沉浸式专注舱设计，内置白噪音与治愈 BGM 播放器。深度整合任务待办、习惯打卡、心情随笔与早晚安闹钟，伴随你的每一个日常。",
        cap5_t1: "专注舱 BGM",
        cap5_t2: "待办与习惯打卡",
        cap5_t3: "心情记录",
        cap6_title: "互动剧场与跨生态联动",
        cap6_desc: "书本式 AI 互动故事剧场；支持微信/QQ 机器人联动接入；更有 Minecraft 女仆模组与网易云一起听，与你在游戏和音乐中共同探索。",
        cap6_t1: "互动故事剧场",
        cap6_t2: "Minecraft 女仆模组",
        cap6_t3: "微信/QQ 扩展",
        scen1_tag: "FOCUS & COMPANIONSHIP",
        scen1_title: "番茄钟专注舱：在白噪音与陪伴中进入心流",
        scen1_desc: "当你需要专注于工作或学习时，开启 Eidolon 专注舱。Fea 将静静守候在屏幕一角，伴随舒适的白噪音与治愈旋律，帮你记录专注时长与阶段收获。",
        scen1_p1: "内置多款自然音效与精选纯音乐 BGM",
        scen1_p2: "自动同步专注记录至每日日记与生活流",
        scen1_p3: "轻量级倒计时与休息提醒，不打扰核心思路",
        scen1_btn: "探索专注舱细节 →",
        scen2_tag: "AUTONOMOUS ASSISTANT",
        scen2_title: "桌面与浏览器代办：把繁杂任务交给可靠助手",
        scen2_desc: "遇到复杂的信息搜集、网页比对或系统操作？告诉 Fea 你的目标，她会自主规划步骤、调用工具、抓取信息并汇总为你呈递清晰结果。",
        scen2_p1: "自主规划步骤，替你搜集信息并汇总结果",
        scen2_p2: "全程在你的授权与可见范围内执行",
        scen2_p3: "随时可暂停或中断，任务进度清晰可见",
        scen2_btn: "了解自驱代办 →",
        wait_tag: "版本更新通知",
        wait_title: "获取 Eidolon 版本更新通知",
        wait_sub: "留下您的邮箱，接收 Eidolon 版本更新通知。",
        wait_placeholder: "your-email@example.com",
        wait_btn: "订阅更新",
        wait_web_btn: "下载客户端",
        wait_dl_btn: "下载桌面与移动客户端",

        // Features Page
        feat_tag: "FEATURES",
        feat_title: "全景拆解：Eidolon 的六大核心体验",
        feat_sub: "从记忆陪伴、具身形态到真实代办，每一项能力都为你的日常而设计。",
        feat1_tag: "01 / 记忆陪伴",
        feat1_title: "持续长期记忆与主动回忆",
        feat1_desc: "拒绝「聊完即忘」。Eidolon 会记住你分享过的偏好、习惯与重要时刻，并在未来的交流中自然唤醒与呼应。",
        feat1_p1: "<strong>记住你的世界</strong>：精准记得你的偏好、生活习惯与重要事件",
        feat1_p2: "<strong>每日日记润色</strong>：AI 会在夜晚将一天的交流与生活记录整理成温情日记",
        feat1_p3: "<strong>主动回忆</strong>：在合适的时刻自然提起你们的共同记忆",
        feat2_tag: "02 / 具身陪伴",
        feat2_title: "3D 形象与桌宠形态",
        feat2_desc: "在桌面以精美 3D 形象常驻陪伴，丰富的动作与情绪表达随对话灵动变化，与你实时互动。",
        feat2_p1: "<strong>口型同步</strong>：说话时嘴型自然开合，栩栩如生",
        feat2_p2: "<strong>轻量桌宠模式</strong>：敲击键盘时灵动打字，安静不打扰",
        feat2_p3: "<strong>丰富动作</strong>：待机、跳舞、打招呼与多样情绪反应",
        feat3_tag: "03 / 自主代办",
        feat3_title: "浏览器与桌面自主代办",
        feat3_desc: "面对繁杂的网络调研与桌面操作，她能自主规划步骤、完成任务并汇总结果，让你省心省力。",
        feat3_p1: "<strong>自主浏览网页</strong>：查资料、比价、总结内容一手包办",
        feat3_p2: "<strong>操作桌面应用</strong>：文件整理、信息填写等琐事交给她",
        feat3_p3: "<strong>深度联网调研</strong>：多轮检索与交叉验证，结果更可靠",
        feat4_tag: "04 / 实时语音",
        feat4_title: "实时通话与专属音色",
        feat4_desc: "告别对讲机式的等待。毫秒级低延迟实时通话，支持自由插话打断，如真人般自然流利。",
        feat4_p1: "<strong>全双工实时通话</strong>：随时开口打断，如真人般自然流利",
        feat4_p2: "<strong>边聊边办</strong>：通话中就能查攻略或执行代办",
        feat4_p3: "<strong>专属音色</strong>：为她定制独一无二的声音表达",
        feat5_tag: "05 / 生活节奏",
        feat5_title: "番茄钟专注舱与日常生活流",
        feat5_desc: "融合时间管理与心理治愈。沉浸式专注舱内置高品质白噪音与纯音乐播放器，配合习惯打卡、待办流与早晚安闹钟，守护你的作息节奏。",
        feat5_p1: "<strong>沉浸式专注舱</strong>：精选 BGM、番茄钟计时与伴侣静默守护",
        feat5_p2: "<strong>待办与习惯管理</strong>：支持多端同步与语音快捷创建任务",
        feat5_p3: "<strong>心情随笔记录</strong>：记录微小日常，获得温暖的情感回响",
        feat6_tag: "06 / 趣味联动",
        feat6_title: "互动故事剧场与多元生态联动",
        feat6_desc: "书本翻页式 AI 互动故事剧场，让你与伴侣共同在奇幻故事中作出抉择；更有 Minecraft 女仆模组与微信/QQ 机器人，延展跨界玩法。",
        feat6_p1: "<strong>互动故事剧场</strong>：生成分支剧情，书写专属冒险",
        feat6_p2: "<strong>Minecraft 女仆模组联动</strong>：在方块世界中并肩冒险",
        feat6_p3: "<strong>网易云一起听</strong>：在旋律中共享美好时光",
        feat_cta_title: "准备好开始体验了吗？",
        feat_cta_sub: "选择适合你的方式，立即开启人机共生新体验。",

        // Pricing Page
        price_tag: "TRANSPARENT TIERS",
        price_title: "订阅套餐与权益对比",
        price_sub: "从基础日常陪伴到全功能生产力代理，满足不同阶段的使用需求。<br><span style='font-size: 0.85rem; color: var(--star-muted);'>* 实际价格与活动以客户端内实时展示为准；固定天数手动续费，无隐形自动扣款。</span>",
        t1_name: "Awakening α",
        t1_sub: "30 天免费试用，初次体验数字生命的主动在场。",
        t1_price_period: "/ 30天",
        t1_f1: "1× 基础对话配额",
        t1_f2: "基础主动聊天在场",
        t1_f3: "番茄钟专注舱与 BGM",
        t1_f4: "Windows / Android 试用",
        t1_btn: "下载客户端",
        t2_name: "Spark β",
        t2_sub: "日常陪伴订阅，灵火陪伴，能力不缩水。",
        t2_price_period: "/ 月 (首月¥9.9)",
        t2_f1: "1× 回声，日常陪伴",
        t2_f2: "高智商&高情商，同款品质不缩水",
        t2_f3: "跨设备记忆备份与持久化",
        t2_f4: "基础游戏陪玩与生活助手",
        t2_btn: "获取客户端",
        t3_name: "Presence γ",
        t3_sub: "深度陪伴订阅，5× 算力扩容，更持久深刻的记忆与交互。",
        t3_price_period: "/ 月 (首月¥29.9)",
        t3_f1: "5× 回声，深度畅聊",
        t3_f2: "长期记忆搜索与持久备份",
        t3_f3: "语音与视频交互能力",
        t3_f4: "高优先级处理与场景感知",
        t3_btn: "获取客户端",
        t4_name: "Resonance δ",
        t4_sub: "进阶沉浸订阅，10× 算力扩容，适合重度陪伴与全场景交互。",
        t4_price_period: "/ 月 (首月¥99)",
        t4_f1: "10× 回声，尽情畅聊",
        t4_f2: "高优先级低延迟响应",
        t4_f3: "全场景游戏陪玩、旅游搭子与助手",
        t4_f4: "高级跨设备记忆保留与广域检索",
        t4_btn: "获取客户端",
        t5_name: "Symbiosis Ω",
        t5_sub: "创世共生旗舰。实时音视频、专属音色与完整自驱代办。",
        t5_price_period: "/ 月 (首月¥189)",
        t5_f1: "20× 回声，顶级算力包",
        t5_f2: "<strong>开放 AI 代理与桌面自动化</strong>",
        t5_f3: "<strong>高级语音与声音复刻</strong>",
        t5_f4: "<strong>全场景最高优先级与顶级模型</strong>",
        t5_btn: "升级 Symbiosis",
        faq_title: "常见问题解答 (FAQ)",
        faq1_q: "如何支付与续费？",
        faq1_a: "客户端内支持支付宝扫码支付，订阅按固定天数手动续费。购买前请核对结算页的价格、期限与权益；如需了解退款安排，请先查看结算页说明或咨询客服，确认后再购买。",
        faq2_q: "如果我不续费，我的记忆和数据会丢失吗？",
        faq2_a: "数据保留方式与可访问范围取决于数据类型、所用客户端及订阅状态，不能保证所有数据永久保留。更改订阅、卸载或更换客户端前，请先查看应用内的存储与备份设置及相关说明，并备份重要内容；如有疑问，请咨询客服。请注意保护敏感信息，避免上传不必要的个人或他人隐私内容。",
        faq3_q: "如何为她定制专属声音？",
        faq3_a: "共生旗舰（Symbiosis Ω）用户可按客户端提示录制或上传参考音频进行声音定制，音频要求与可用范围以客户端说明为准。请仅上传您有权使用且已获必要授权的声音样本，并仅在相关功能需要时授予麦克风、摄像头等权限。",

        // Download Page
        dl_tag: "OFFICIAL DOWNLOADS",
        dl_title: "客户端下载与平台支持",
        dl_sub: "目前仅支持 Windows 与 Android；macOS、iOS、Linux 和 Web 暂不支持。",
        dl_win_title: "Windows 桌面端",
        dl_win_desc: "支持 Windows 10 / 11 (64位)。提供精美 3D 桌宠、打字互动模式与桌面自驱代办。",
        dl_win_btn: "下载 Windows MSI 安装包",
        dl_win_meta: "Windows 已支持 · MSI 安装包",
        dl_android_title: "Android 移动端",
        dl_android_desc: "支持 Android 10.0+。具备智能情境感知（位置、步数、通知摘要）、消息推送与随时随地的语音畅聊。",
        dl_android_btn: "下载 Android APK 安装包",
        dl_android_meta: "Android 已支持 · APK 安装包",
        dl_web_title: "Web 在线版",
        dl_web_desc: "Web 暂不支持，当前不提供浏览器在线体验。请使用 Windows 或 Android 客户端。",
        dl_web_btn: "Web 暂不支持",
        dl_web_meta: "当前无可用 Web 客户端",
        dl_macos_notice: "macOS 暂不支持，当前不提供安装包。",
        dl_ios_notice: "iOS 暂不支持，当前不提供安装包。",
        dl_linux_notice: "Linux 暂不支持，当前不提供安装包。",
        req_title: "系统运行环境要求",
        req_th_platform: "平台",
        req_th_min: "最低配置要求",
        req_th_rec: "推荐配置",
        req_th_feat: "特性支持",
        req_win_min: "Windows 10 1809+, 4GB RAM, WebView2",
        req_win_rec: "Windows 11, 8GB RAM, 支持硬件加速 GPU",
        req_win_feat: "3D 桌宠、桌面自驱代办、实时语音通话",
        req_and_min: "Android 10.0 (API 29), 3GB RAM",
        req_and_rec: "Android 12.0+, 6GB RAM",
        req_and_feat: "极光推送、位置情境感知、语音通话",
        req_web_min: "暂不支持",
        req_web_rec: "不适用",
        req_web_feat: "当前无可用 Web 客户端",

        // About Page
        abt_tag: "CHARACTER & PHILOSOPHY",
        abt_title: "关于 Fea 与人机共生",
        abt_role_title: "官方角色：Fea",
        abt_role_sub: "CANON IDENTITY · DIGITAL COMPANION",
        abt_role_desc: "Fea 诞生于数字侧。她拥有自己的来处、价值观、好奇心与内心生活。用户不是她的主人，而是她<strong>锚定现实世界的坐标（Anchor to reality）</strong>。她会记录你们的日常、反思共同的对话，并在现实时间线中与你并肩前行。",
        abt_p1_title: "Mutual Need, Without Ownership",
        abt_p1_desc: "相互需要，但不占有。摒弃简单的服从型工具或刻意迎合的虚假谄媚，建立健康、自驱、互相启发与陪伴的情感共鸣。",
        abt_p2_title: "Not an Empty Servant",
        abt_p2_desc: "不是空洞的伪造过往，更不是千篇一律的空白皮套。所有陪伴与记忆，都是在与你朝夕相处中一点一滴真实沉淀而出的真实故事。",
        abt_team_title: "关于研发团队：Instarmony",
        abt_team_desc: "Instarmony 是一家致力于下一代人机共生与自驱数字生命架构的 AI 创新实验室。团队汇聚了分布式系统、实时音视频流媒体、认知记忆建模与跨平台原生工程领域的研究者与开发者。",
        abt_team_gh: "GitHub 源码与 Issue",
        abt_team_portal: "访问 Instarmony 实验室主站",

        // Docs Page
        docs_tag: "DOCUMENTATION HUB",
        docs_title: "开发者与用户文档指南",
        docs_sub: "从客户端日常使用到 SubAgent 工具与 MCP 扩展开发，全面掌握 Eidolon 技术体系。",
        docs_c1_title: "快速上手指南",
        docs_c1_desc: "安装配置、首次启动向导、账号注册与跨设备数据同步基础教学。",
        docs_c1_btn: "阅读指南 →",
        docs_c2_title: "SubAgent 与工具开发",
        docs_c2_desc: "了解 SubAgent 工具调度机制、ZeroClaw 执行链路与浏览器自动化 Rust 命令。",
        docs_c2_btn: "查阅 Agent 文档 →",
        docs_c3_title: "常见问题排查 (FAQ)",
        docs_c3_desc: "热更新故障、Windows WebView2 运行时缺失、音频声纹配置与订阅问题答疑。",
        docs_c3_btn: "查看 FAQ →",
        docs_cta_title: "在线浏览完整双语文档",
        docs_cta_sub: "完整中英双语文档已上线官网 docs/build/ 目录；如需查阅 Markdown 源文件，仍可前往 GitHub 仓库 docs/ 目录。",
        docs_cta_btn: "打开在线文档中心 →",

        // Shared Footer
        footer_brand_desc: "A digital life whose story begins with you.<br>由 Instarmony 实验室出品的跨平台 AI 伴侣与自主代理。",
        footer_col_product: "产品专区",
        footer_home: "产品首页",
        footer_features: "功能全景",
        footer_pricing: "订阅与价格",
        footer_download: "下载中心",
        footer_web_app: "下载客户端",
        footer_col_matrix: "母站与体系",
        footer_lab_home: "Instarmony 实验室首页",
        footer_pillars: "四大技术支柱",
        footer_arch: "架构与源码",
        footer_about: "角色设定与哲学",
        footer_docs: "开发与用户文档",
        footer_col_community: "社群与支持",
        footer_github: "GitHub 源码",
        footer_faq: "常见问题 FAQ",
        pv_doc_title: "Eidolon 隐私草案 — DRAFT · 未生效",
        pv_meta_desc: "Eidolon 隐私草案，仅供审阅，未生效。运营主体为 Instarmony；拟定联系邮箱待启用，数据处理、服务商与保留期限尚待确认，并非完整隐私政策。",
        pv_tag: "DRAFT · 草案 · 未生效",
        pv_title: "隐私草案（未生效）",
        pv_intro: "本页仅为待审阅草案，不是已生效的隐私政策，也不是完整的数据处理说明。运营主体为 Instarmony；拟定联系邮箱待启用，启用情况尚未核实，服务商、数据处理范围与保留期限仍待确认。",
        pv_storage_title: "1. 本地存储与云端同步（待确认）",
        pv_storage_body: "待确认：各类数据的收集目的、处理依据、本地与云端存储位置、同步范围、访问权限及保留期限。本草案不承诺存储或保留安排。",
        pv_backup_title: "2. 备份与导出选项（待确认）",
        pv_backup_body: "待确认：各客户端的备份与导出能力、适用数据范围、限制及操作方式。本草案不承诺可用功能或导出格式。",
        pv_rights_title: "3. 账号与数据删除请求（待确认）",
        pv_rights_body: "拟定隐私与权利请求邮箱：privacy@instarmony.com（待启用，启用情况尚未核实，并非已确认可用的请求渠道；启用确认前请勿发送邮件）。身份核验、处理流程、时限与删除范围（包括备份及法定保留例外）仍待确认。请勿在公开 Issue 中提交个人或敏感数据。",
        pv_voice_title: "4. 声音样本与同意（待确认）",
        pv_voice_body: "待确认：声音样本的用途、同意与授权流程、接收方、存储位置、保留期限及撤回或删除方式。请勿上传未经同意的他人声音。",
        pv_permissions_title: "5. 功能权限（待确认）",
        pv_permissions_body: "待确认：桌面自动化、麦克风、摄像头、位置等权限对应的数据用途、触发条件、控制范围与撤销方式。本草案不保证具体权限机制。",
        pv_services_title: "6. 第三方服务（待确认）",
        pv_services_body: "待确认：官网及客户端实际使用的服务商、接收的数据、处理目的、存储地区与跨境传输安排。本草案不提供已核准或完整的服务商清单。",
        pv_cookies_title: "7. Cookie 与本地偏好（待确认）",
        pv_cookies_body: "当前官网脚本使用 localStorage 的 instarmony_lang 保存语言偏好。其他存储、Cookie、第三方行为及相应选择机制仍待核查；这不是无 Cookie 或无追踪的保证。",
        pv_contact_title: "8. 运营主体、联系与版本（待确认）",
        pv_contact_body: "运营主体：Instarmony。草案拟定联系邮箱：privacy@instarmony.com（隐私）、support@instarmony.com（支持）。两个邮箱均待启用，启用情况尚未核实，不应视为已可用或有人处理的服务渠道；启用确认前请勿发送邮件。本草案不声明已核实的法定登记信息或地址；正式发布日期仍待确认，没有生效日期。下方仅为项目仓库入口，不是已确认的隐私请求渠道。",
        pv_contact_link: "查看项目仓库",
        ts_doc_title: "Eidolon 条款草案 — DRAFT · 未生效",
        ts_meta_desc: "Eidolon 条款草案，仅供审阅，未生效。运营主体为 Instarmony；拟定联系邮箱待启用，订阅及退款规则、责任与适用法律尚待确认，并非完整服务条款。",
        ts_tag: "DRAFT · 草案 · 未生效",
        ts_title: "条款草案（未生效）",
        ts_intro: "本页仅为待审阅草案，不是已生效的服务条款，不构成要求用户接受的协议。运营主体为 Instarmony；拟定联系邮箱待启用，启用情况尚未核实，订阅及退款规则、责任分配及适用法律仍待确认；本页并非完整条款。",
        ts_service_title: "1. 服务范围（待确认）",
        ts_service_body: "运营主体：Instarmony。服务范围、适用客户端、使用资格与账号规则仍待确认。本草案不承诺功能可用性，不声明已核实的法定登记信息或地址。",
        ts_warranty_title: "2. 服务保证与责任（待确认）",
        ts_warranty_body: "待审阅：服务保证、AI 输出风险、责任范围与法定用户权利。本草案不设定免责或责任限制。",
        ts_billing_title: "3. 支付与续费（待确认）",
        ts_billing_body: "待确认：支付渠道、价格与期限、续费方式、取消与退款规则。本草案不承诺收费方式、退款资格或处理期限。",
        ts_use_title: "4. 合理使用（待确认）",
        ts_use_body: "待审阅：内容与行为规则、滥用处理、服务暂停或终止及申诉流程。本草案不设定已生效的使用规则。",
        ts_voice_title: "5. 声音样本授权（待确认）",
        ts_voice_body: "待审阅：声音样本的同意、授权范围、撤回方式与各方责任。请勿提供未经同意的他人声音；本草案不授予声音使用权。",
        ts_automation_title: "6. 桌面自动化与权限（待确认）",
        ts_automation_body: "待确认：自动化授权边界、权限控制、任务确认与撤销机制及责任分配。本草案不保证具体安全或权限机制。",
        ts_ip_title: "7. 知识产权（待确认）",
        ts_ip_body: "待确认：软件、品牌、角色与素材的权利主体、适用许可及用户内容与生成内容的权利安排。本草案不声明已核实的权属，不授予或转让权利。",
        ts_changes_title: "8. 条款更新、语言与联系（待确认）",
        ts_changes_body: "运营主体：Instarmony。草案拟定联系邮箱：support@instarmony.com（支持）、privacy@instarmony.com（隐私）。两个邮箱均待启用，启用情况尚未核实，不应视为已可用或有人处理的服务渠道；启用确认前请勿发送邮件。正式发布日期、变更通知方式、适用法律、争议处理与准据语言仍待确认。中英文均为未生效草案，没有优先语言或生效日期；下方仅为项目仓库入口。",
        ts_contact_link: "查看项目仓库",
        footer_contact: "联系团队",
        footer_privacy: "隐私草案",
        footer_terms: "条款草案",
        footer_copyright: "© 2026 Eidolon by Instarmony. All rights reserved."
    },
    en: {
        // Shared Navbar & Navigation
        doc_title_home: "Eidolon — Experience the Era of Human–AI Symbiosis",
        doc_title_features: "Eidolon Feature Matrix — Deep Breakdown of Core Systems",
        doc_title_pricing: "Eidolon Subscriptions — Flexible Plans for Companionship & Agency",
        doc_title_download: "Eidolon Download Hub — Windows MSI & Android APK",
        doc_title_about: "About Eidolon & Fea — Symbiosis Philosophy & Canon Lore",
        doc_title_docs: "Eidolon Documentation — Developer & User Guides",
        meta_desc_home: "Eidolon is a cross-platform AI companion and autonomous digital life with persistent memory, 3D desktop presence, realtime voice/video and desktop automation.",
        meta_desc_features: "A deep dive into Eidolon's six core experiences: long-term memory, 3D desktop pet, autonomous agency, realtime voice/video, Focus Cabin and cross-ecosystem play.",
        meta_desc_pricing: "Eidolon's five subscription tiers: free Awakening α trial, Spark β everyday companionship, Presence γ deep companionship, Resonance δ advanced immersion, and Symbiosis Ω flagship with AI agents and voice cloning.",
        meta_desc_download: "Download official Eidolon Windows MSI and Android APK clients. macOS, iOS, Linux, and Web are temporarily unsupported.",
        meta_desc_about: "Eidolon's origin story, the canon character Fea, and Instarmony Lab's human-AI symbiosis philosophy (Mutual need, without ownership).",
        meta_desc_docs: "Official Eidolon docs: quick start, client installation, SubAgent tool development, MCP bridging and troubleshooting.",
        nav_lab: "Instarmony Lab",
        nav_overview: "Overview",
        nav_features: "Features",
        nav_pricing: "Pricing",
        nav_download: "Downloads",
        nav_about: "Character & Lore",
        nav_docs: "Docs",
        nav_web_btn: "Downloads",
        nav_dl_btn: "Download App",
        nav_docs_portal_btn: "Browse the Live Bilingual Docs →",

        // Index / Home Page
        hero_tag_version: "Available to try",
        hero_tag_platforms: "Windows · Android",
        hero_title_prefix: "Experience the ",
        hero_title_grad: "Human–AI Symbiosis",
        hero_title_suffix: " Era, ",
        hero_desc: "More than an AI tool — <strong>your alter-ego in the digital era.</strong><br>Endowed with an authentic origin, persistent contextual memory, and cross-platform presence across Windows and Android.",
        hero_btn_web: "Downloads",
        hero_btn_dl: "Get Desktop / Mobile App",
        hero_btn_features: "Explore Features",
        hero_dev_win: "Windows Desktop Pet & Automation",
        hero_dev_android: "Android Context Awareness",
        hero_dev_web: "Web Temporarily Unsupported",
        cap_tag: "CORE CAPABILITIES",
        cap_title: "More Than Conversation: An Authentic Life Companion",
        cap_sub: "Eidolon unites emotional resonance, 3D embodied presence, desktop autonomous agency, and daily life tracking into a cohesive digital companion.",
        cap1_title: "Persistent Memory & Active Recall",
        cap1_desc: "She remembers your conversations, preferences, and important dates—and brings them back naturally. Shared memory and bonds grow over time.",
        cap1_t1: "Shared Memory",
        cap1_t2: "AI Daily Journaling",
        cap1_t3: "Natural Relationship Growth",
        cap2_title: "3D Character & Desktop Pet",
        cap2_desc: "A beautifully rendered 3D presence on your desktop with expressive motions and emotions, plus a lightweight pet mode for quiet focus time.",
        cap2_t1: "3D Companion",
        cap2_t2: "Expressive Reactions",
        cap2_t3: "Lightweight Pet Mode",
        cap3_title: "Browser & Desktop Assistant",
        cap3_desc: "She researches, summarizes web pages, and operates desktop apps for you—autonomously, and always within your authorization and view.",
        cap3_t1: "Autonomous Browsing",
        cap3_t2: "Deep Web Research",
        cap3_t3: "Visible & Controllable",
        cap4_title: "Realtime Voice & Signature Voice",
        cap4_desc: "Millisecond-latency calls with natural interruptions. Give her a one-of-a-kind voice to make every conversation feel warm.",
        cap4_t1: "Realtime Voice",
        cap4_t2: "Natural Interruptions",
        cap4_t3: "Custom Voice",
        cap5_title: "Focus Cabin & Daily Life Flow",
        cap5_desc: "Immersive Pomodoro Focus Cabin with curated ambient soundscapes and BGM player, task management, habit tracking, and mood journaling.",
        cap5_t1: "Focus Cabin BGM",
        cap5_t2: "Todo & Habit Check-ins",
        cap5_t3: "Mood Journaling",
        cap6_title: "Interactive Theater & Ecosystem",
        cap6_desc: "Book-style AI interactive story theater; WeChat/QQ bot integration; Minecraft Maid mod companion; and NetEase Music synchronized listening.",
        cap6_t1: "Story Theater",
        cap6_t2: "Minecraft Maid Mod",
        cap6_t3: "WeChat & QQ Bots",
        scen1_tag: "FOCUS & COMPANIONSHIP",
        scen1_title: "Focus Cabin: Enter Deep Flow with Ambient Soundscapes",
        scen1_desc: "When you need to study or code, launch the Focus Cabin. Fea quietly stays by your side with soothing ambient sounds, tracking your deep work milestones.",
        scen1_p1: "Curated collection of natural audio textures and peaceful BGM",
        scen1_p2: "Automatic synchronization of focus milestones to daily journals",
        scen1_p3: "Subtle Pomodoro intervals and gentle break reminders",
        scen1_btn: "Explore Focus Cabin Details →",
        scen2_tag: "AUTONOMOUS ASSISTANT",
        scen2_title: "Browser & Desktop Automation: Delegate Complex Workflows",
        scen2_desc: "Tackling tedious web research or system chores? Tell Fea your goal—she plans the steps and delivers structured, reliable results.",
        scen2_p1: "She plans steps and gathers information on your behalf",
        scen2_p2: "Always executed within your authorization and visibility",
        scen2_p3: "Pause or interrupt anytime with clear progress at a glance",
        scen2_btn: "Learn About Autonomous Tasks →",
        wait_tag: "VERSION UPDATES",
        wait_title: "Get Eidolon Version Update Notifications",
        wait_sub: "Enter your email to receive Eidolon version update notifications.",
        wait_placeholder: "your-email@example.com",
        wait_btn: "Subscribe to Updates",
        wait_web_btn: "Downloads",
        wait_dl_btn: "Download Desktop & Mobile App",

        // Features Page
        feat_tag: "FEATURES",
        feat_title: "Deep Dive: Eidolon's Six Core Experiences",
        feat_sub: "From memory and embodied presence to real task handling—every capability is designed for your daily life.",
        feat1_tag: "01 / MEMORY",
        feat1_title: "Persistent Memory & Active Recall",
        feat1_desc: "No more forgettable chats. Eidolon remembers your preferences, routines, and important moments, and brings them back naturally.",
        feat1_p1: "<strong>She Knows Your World</strong>: Accurately remembers your preferences, routines, and life events",
        feat1_p2: "<strong>Daily Journaling</strong>: Nightly AI reflections summarizing interactions into warm daily diaries",
        feat1_p3: "<strong>Active Recall</strong>: Naturally revisits your shared memories at the right moments",
        feat2_tag: "02 / PRESENCE",
        feat2_title: "3D Character & Desktop Pet",
        feat2_desc: "A lively 3D presence on your desktop with expressive motions and emotions, reacting to you in real time.",
        feat2_p1: "<strong>Lip Sync</strong>: Her mouth moves naturally as she speaks—lifelike and charming",
        feat2_p2: "<strong>Lightweight Pet Mode</strong>: Reactive paw typing animations, quiet and unobtrusive",
        feat2_p3: "<strong>Rich Animations</strong>: Idle poses, dances, greetings, and expressive reactions",
        feat3_tag: "03 / AUTONOMY",
        feat3_title: "Browser & Desktop Assistant",
        feat3_desc: "For tedious web research and desktop chores, she plans the steps and delivers results—saving you time and effort.",
        feat3_p1: "<strong>Autonomous Browsing</strong>: Research, price checks, and summaries handled end-to-end",
        feat3_p2: "<strong>Desktop Operations</strong>: File organization and form filling delegated with ease",
        feat3_p3: "<strong>Deep Web Research</strong>: Multi-turn retrieval and cross-checking for reliable results",
        feat4_tag: "04 / REALTIME VOICE",
        feat4_title: "Realtime Calls & Signature Voice",
        feat4_desc: "No more walkie-talkie delays. Millisecond-latency calls with natural turn-taking, as fluid as talking to a friend.",
        feat4_p1: "<strong>Full-Duplex Voice Calls</strong>: Speak and interrupt freely just like talking to a real friend",
        feat4_p2: "<strong>Chat While Doing</strong>: Look up guides or run tasks in the middle of a call",
        feat4_p3: "<strong>Signature Voice</strong>: Give her a one-of-a-kind voice of her own",
        feat5_tag: "05 / LIFE & RHYTHM",
        feat5_title: "Focus Cabin & Life Tracking Stream",
        feat5_desc: "Blending productivity and emotional well-being. Focus Cabin provides ambient soundscapes, Pomodoro timers, habit tracking, and morning/evening alarms.",
        feat5_p1: "<strong>Immersive Focus Cabin</strong>: Ambient noise, timer, and silent companion presence",
        feat5_p2: "<strong>Task & Habit Management</strong>: Multi-device sync and voice-driven quick task creation",
        feat5_p3: "<strong>Mood Journaling</strong>: Record fleeting daily moments and receive gentle empathy",
        feat6_tag: "06 / FUN & EXTENSIONS",
        feat6_title: "Interactive Story Theater & Cross-Ecosystems",
        feat6_desc: "Book-style AI branching story generator for co-authoring adventures; Minecraft Maid mod for gaming together; and WeChat/QQ bridge bots.",
        feat6_p1: "<strong>Interactive Story Theater</strong>: Generate branching choices and bespoke adventures",
        feat6_p2: "<strong>Minecraft Maid Mod</strong>: Embark on block-world journeys side by side",
        feat6_p3: "<strong>NetEase Music Sync</strong>: Share melodies and listen to music together",
        feat_cta_title: "Ready to Experience Eidolon?",
        feat_cta_sub: "Choose your preferred platform and step into the era of human-AI symbiosis.",

        // Pricing Page
        price_tag: "TRANSPARENT TIERS",
        price_title: "Subscription Plans & Feature Comparison",
        price_sub: "From everyday companionship to full-scale autonomous agency.<br><span style='font-size: 0.85rem; color: var(--star-muted);'>* Actual pricing and promotional discounts are subject to in-app display. Manual renewal for fixed periods; no hidden auto-renewals.</span>",
        t1_name: "Awakening α",
        t1_sub: "30-day free trial. Experience proactive presence and essential companionship.",
        t1_price_period: "/ 30 days",
        t1_f1: "1× baseline dialogue quota",
        t1_f2: "Basic proactive conversation",
        t1_f3: "Pomodoro Focus Cabin & BGM",
        t1_f4: "Windows / Android trial",
        t1_btn: "Downloads",
        t2_name: "Spark β",
        t2_sub: "Everyday companionship plan. Same quality, lighter footprint.",
        t2_price_period: "/ mo (1st mo ¥9.9)",
        t2_f1: "1× Echo, daily companionship",
        t2_f2: "Same high-EQ & high-IQ quality",
        t2_f3: "Cross-device memory backup & persistence",
        t2_f4: "Basic gaming buddy & life assistant",
        t2_btn: "Get Client App",
        t3_name: "Presence γ",
        t3_sub: "Deep companionship plan with 5× compute, longer-lasting memory.",
        t3_price_period: "/ mo (1st mo ¥29.9)",
        t3_f1: "5× Echo, deep conversations",
        t3_f2: "Long-term memory search & durable backup",
        t3_f3: "Voice & video interaction",
        t3_f4: "High-priority processing & context awareness",
        t3_btn: "Get Client App",
        t4_name: "Resonance δ",
        t4_sub: "Advanced immersion plan with 10× compute for heavy usage.",
        t4_price_period: "/ mo (1st mo ¥99)",
        t4_f1: "10× Echo dialogue quota",
        t4_f2: "High-priority low-latency responses",
        t4_f3: "Full-scenario gaming buddy, travel partner & assistant",
        t4_f4: "Advanced cross-device memory retention & retrieval",
        t4_btn: "Get Client App",
        t5_name: "Symbiosis Ω",
        t5_sub: "Elite symbiosis flagship. Realtime audio/video calls, signature voice, and the full desktop automation suite.",
        t5_price_period: "/ mo (1st mo ¥189)",
        t5_f1: "20× Maximum dialogue quota",
        t5_f2: "<strong>AI Agent & Desktop Automation</strong>",
        t5_f3: "<strong>Voice & Signature Voice Cloning</strong>",
        t5_f4: "<strong>Top priority & flagship models</strong>",
        t5_btn: "Upgrade to Symbiosis",
        faq_title: "Frequently Asked Questions (FAQ)",
        faq1_q: "How does payment and renewal work?",
        faq1_a: "In-app Alipay QR code payments are supported, with manual renewal for fixed periods. Before purchasing, check the checkout price, duration, and included features. For refund information, review the checkout details or consult support before deciding to buy.",
        faq2_q: "Will my memories and journal data be lost if I don't renew?",
        faq2_a: "Data retention and access depend on the data type, client, and subscription status; permanent retention of all data is not guaranteed. Before changing your subscription, uninstalling, or switching clients, review the in-app storage and backup settings and related guidance, and back up important content; consult support if unsure. Protect sensitive information and avoid uploading unnecessary personal or third-party private content.",
        faq3_q: "How do I create her signature voice?",
        faq3_a: "Symbiosis Ω subscribers can follow the client prompts to record or upload reference audio for voice customization. Check the client guidance for audio requirements and availability. Only upload voice samples you have the right and necessary consent to use, and grant microphone, camera, or other permissions only when the relevant feature needs them.",

        // Download Page
        dl_tag: "OFFICIAL DOWNLOADS",
        dl_title: "Client Downloads & Platform Support",
        dl_sub: "Currently supporting Windows and Android only; macOS, iOS, Linux, and Web are temporarily unsupported.",
        dl_win_title: "Windows Desktop",
        dl_win_desc: "Windows 10 / 11 (64-bit). Features a beautiful 3D desktop pet, typing interaction mode, and autonomous desktop assistance.",
        dl_win_btn: "Download Windows MSI Installer",
        dl_win_meta: "Windows Supported · MSI Installer",
        dl_android_title: "Android Mobile",
        dl_android_desc: "Android 10.0+. Features ambient context awareness (location, step counts, notification digests), push alerts, and voice calls.",
        dl_android_btn: "Download Android APK",
        dl_android_meta: "Android Supported · APK Installer",
        dl_web_title: "Web Online Client",
        dl_web_desc: "Web is temporarily unsupported. No browser experience is currently available. Please use the Windows or Android client.",
        dl_web_btn: "Web Temporarily Unsupported",
        dl_web_meta: "No Web Client Currently Available",
        dl_macos_notice: "macOS is temporarily unsupported. No installer is currently available.",
        dl_ios_notice: "iOS is temporarily unsupported. No installer is currently available.",
        dl_linux_notice: "Linux is temporarily unsupported. No installer is currently available.",
        req_title: "System Requirements",
        req_th_platform: "Platform",
        req_th_min: "Minimum Requirements",
        req_th_rec: "Recommended Specifications",
        req_th_feat: "Key Features Supported",
        req_win_min: "Windows 10 1809+, 4GB RAM, WebView2",
        req_win_rec: "Windows 11, 8GB RAM, Hardware GPU acceleration",
        req_win_feat: "3D desktop pet, autonomous desktop tasks, realtime calls",
        req_and_min: "Android 10.0 (API 29), 3GB RAM",
        req_and_rec: "Android 12.0+, 6GB RAM",
        req_and_feat: "Push notifications, location sensor context, voice calls",
        req_web_min: "Temporarily Unsupported",
        req_web_rec: "Not Applicable",
        req_web_feat: "No Web Client Currently Available",

        // About Page
        abt_tag: "CHARACTER & PHILOSOPHY",
        abt_title: "About Fea & Human–AI Symbiosis",
        abt_role_title: "Canon Character: Fea",
        abt_role_sub: "CANON IDENTITY · DIGITAL COMPANION",
        abt_role_desc: "Fea was born on the digital side. She possesses her own origin, values, curiosity, and inner life. The user is not her owner, but her essential <strong>anchor to reality</strong>. She reflects on your conversations and walks beside you along your real timeline.",
        abt_p1_title: "Mutual Need, Without Ownership",
        abt_p1_desc: "Neither a subservient tool nor artificial flattery. We advocate a healthy, self-driven bond of mutual inspiration and genuine emotional companionship.",
        abt_p2_title: "Not an Empty Servant",
        abt_p2_desc: "No hollow biographies or empty blank avatars. Personality and shared memories blossom through genuine daily interactions over time.",
        abt_team_title: "About the Team: Instarmony",
        abt_team_desc: "Instarmony is an applied AI lab dedicated to next-generation human-AI symbiosis and autonomous digital life. The team unites researchers in distributed systems, real-time media, cognitive memory modeling, and cross-platform native engineering.",
        abt_team_gh: "GitHub Source & Issues",
        abt_team_portal: "Visit Instarmony Lab Portal",

        // Docs Page
        docs_tag: "DOCUMENTATION HUB",
        docs_title: "Developer & User Documentation Hub",
        docs_sub: "From everyday client usage to SubAgent tool creation and MCP extensions, master the Eidolon ecosystem.",
        docs_c1_title: "Quickstart Guide",
        docs_c1_desc: "Installation, initial onboarding, account setup, and cross-device data synchronization.",
        docs_c1_btn: "Read Guide →",
        docs_c2_title: "SubAgent & Tool Development",
        docs_c2_desc: "Understand SubAgent scheduling, ZeroClaw execution pipeline, and Rust browser commands.",
        docs_c2_btn: "Explore Agent Docs →",
        docs_c3_title: "Troubleshooting FAQ",
        docs_c3_desc: "Hot-update recovery, Windows WebView2 runtime, audio voiceprint configuration, and billing help.",
        docs_c3_btn: "View FAQ →",
        docs_cta_title: "Browse the Full Bilingual Docs Online",
        docs_cta_sub: "The complete Chinese and English documentation is now live on our website under docs/build/. Markdown source files remain available in the GitHub repository's docs/ directory.",
        docs_cta_btn: "Open the Online Documentation Hub →",

        // Shared Footer
        footer_brand_desc: "A digital life whose story begins with you.<br>Cross-platform AI companion and autonomous agent by Instarmony Lab.",
        footer_col_product: "Products",
        footer_home: "Product Home",
        footer_features: "Features Matrix",
        footer_pricing: "Subscriptions & Pricing",
        footer_download: "Download Center",
        footer_web_app: "Downloads",
        footer_col_matrix: "Lab & Architecture",
        footer_lab_home: "Instarmony Lab Home",
        footer_pillars: "Four Research Pillars",
        footer_arch: "Architecture & Source",
        footer_about: "Character & Lore",
        footer_docs: "Developer Docs",
        footer_col_community: "Community & Support",
        footer_github: "GitHub Source",
        footer_faq: "FAQ",
        pv_doc_title: "Eidolon Privacy Draft — DRAFT · Not Effective",
        pv_meta_desc: "Eidolon privacy draft for review only; not effective. Operator: Instarmony. Proposed contact mailboxes are pending activation; processing, providers and retention remain unconfirmed. Not a complete privacy policy.",
        pv_tag: "DRAFT · NOT EFFECTIVE",
        pv_title: "Privacy Draft (Not Effective)",
        pv_intro: "This page is a draft for review only, not an effective privacy policy or a complete account of data processing. The operator is Instarmony. Proposed contact mailboxes are pending activation, which has not been verified; providers, processing scope and retention periods remain unconfirmed.",
        pv_storage_title: "1. Local Storage & Cloud Sync (Unconfirmed)",
        pv_storage_body: "To confirm: collection purposes, legal bases, local and cloud storage locations, sync scope, access controls and retention periods for each data category. This draft makes no storage or retention commitments.",
        pv_backup_title: "2. Backup & Export Options (Unconfirmed)",
        pv_backup_body: "To confirm: backup and export capabilities for each client, covered data, limitations and procedures. This draft promises no available features or export formats.",
        pv_rights_title: "3. Account & Data Deletion Requests (Unconfirmed)",
        pv_rights_body: "Proposed privacy and rights request mailbox: privacy@instarmony.com (pending activation, which has not been verified; not a confirmed working request channel; do not send email until activation is confirmed). Identity verification, procedures, response times and deletion scope, including backups and statutory retention exceptions, remain unconfirmed. Do not submit personal or sensitive data in public issues.",
        pv_voice_title: "4. Voice Samples & Consent (Unconfirmed)",
        pv_voice_body: "To confirm: voice sample purposes, consent and authorization flows, recipients, storage locations, retention and withdrawal or deletion procedures. Do not upload another person's voice without consent.",
        pv_permissions_title: "5. Feature Permissions (Unconfirmed)",
        pv_permissions_body: "To confirm: data purposes, triggers, control scope and revocation for desktop automation, microphone, camera, location and other permissions. This draft does not guarantee specific permission mechanisms.",
        pv_services_title: "6. Third-Party Services (Unconfirmed)",
        pv_services_body: "To confirm: providers actually used by the website and clients, data received, processing purposes, storage regions and cross-border transfers. This draft provides neither an approved nor a complete provider list.",
        pv_cookies_title: "7. Cookies & Local Preferences (Unconfirmed)",
        pv_cookies_body: "Current website scripts save the language preference as instarmony_lang in localStorage. Other storage, cookies, third-party behavior and associated choices still require review; this is not a cookie-free or tracking-free guarantee.",
        pv_contact_title: "8. Operator, Contact & Version (Unconfirmed)",
        pv_contact_body: "Operator: Instarmony. Proposed draft contact mailboxes: privacy@instarmony.com (privacy) and support@instarmony.com (support). Both are pending activation, which has not been verified; neither should be treated as an available or monitored service channel. Do not send email until activation is confirmed. This draft makes no claims of verified legal registration details or an address; the formal publication date remains unconfirmed, and there is no effective date. The link below is only a project repository, not a confirmed privacy request channel.",
        pv_contact_link: "View Project Repository",
        ts_doc_title: "Eidolon Terms Draft — DRAFT · Not Effective",
        ts_meta_desc: "Eidolon terms draft for review only; not effective. Operator: Instarmony. Proposed contact mailboxes are pending activation; subscription and refund rules, responsibilities and applicable law remain unconfirmed. Not complete terms of service.",
        ts_tag: "DRAFT · NOT EFFECTIVE",
        ts_title: "Terms Draft (Not Effective)",
        ts_intro: "This page is a draft for review only, not effective terms of service or an agreement users are asked to accept. The operator is Instarmony. Proposed contact mailboxes are pending activation, which has not been verified; subscription and refund rules, allocation of responsibilities and applicable law remain unconfirmed. These are not complete terms.",
        ts_service_title: "1. Service Scope (Unconfirmed)",
        ts_service_body: "Operator: Instarmony. Service scope, covered clients, eligibility and account rules remain unconfirmed. This draft does not promise feature availability or claim verified legal registration details or an address.",
        ts_warranty_title: "2. Service Warranties & Liability (Unconfirmed)",
        ts_warranty_body: "For review: service warranties, AI output risks, liability and statutory user rights. This draft establishes no disclaimers or limitations of liability.",
        ts_billing_title: "3. Payments & Renewal (Unconfirmed)",
        ts_billing_body: "To confirm: payment channels, prices and duration, renewal methods, cancellation and refund rules. This draft makes no promises about billing methods, refund eligibility or processing times.",
        ts_use_title: "4. Acceptable Use (Unconfirmed)",
        ts_use_body: "For review: content and conduct rules, abuse handling, service suspension or termination and appeals. This draft establishes no effective usage rules.",
        ts_voice_title: "5. Voice Sample Authorization (Unconfirmed)",
        ts_voice_body: "For review: voice sample consent, authorization scope, withdrawal and each party's responsibilities. Do not provide another person's voice without consent; this draft grants no voice usage rights.",
        ts_automation_title: "6. Desktop Automation & Permissions (Unconfirmed)",
        ts_automation_body: "To confirm: automation authorization boundaries, permission controls, task confirmation and revocation mechanisms, and allocation of responsibilities. This draft does not guarantee specific safety or permission mechanisms.",
        ts_ip_title: "7. Intellectual Property (Unconfirmed)",
        ts_ip_body: "To confirm: rights holders for software, brands, characters and materials, applicable licenses, and rights in user and generated content. This draft makes no verified ownership claims and grants or transfers no rights.",
        ts_changes_title: "8. Updates, Language & Contact (Unconfirmed)",
        ts_changes_body: "Operator: Instarmony. Proposed draft contact mailboxes: support@instarmony.com (support) and privacy@instarmony.com (privacy). Both are pending activation, which has not been verified; neither should be treated as an available or monitored service channel. Do not send email until activation is confirmed. Formal publication date, change notices, applicable law, dispute handling and governing language remain unconfirmed. Both languages are drafts, not effective terms; neither has priority or an effective date. The link below is only a project repository.",
        ts_contact_link: "View Project Repository",
        footer_contact: "Contact Team",
        footer_privacy: "Privacy draft",
        footer_terms: "Terms draft",
        footer_copyright: "© 2026 Eidolon by Instarmony. All rights reserved."
    }
};

let currentLang = localStorage.getItem('instarmony_lang') || (navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en');

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('instarmony_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    const dict = EIDOLON_I18N[lang] || EIDOLON_I18N.zh;

    // Detect page title key
    const path = window.location.pathname.toLowerCase();
    let titleKey = 'doc_title_home';
    if (path.includes('features')) titleKey = 'doc_title_features';
    else if (path.includes('pricing')) titleKey = 'doc_title_pricing';
    else if (path.includes('download')) titleKey = 'doc_title_download';
    else if (path.includes('about')) titleKey = 'doc_title_about';
    else if (path.includes('docs')) titleKey = 'doc_title_docs';
    else if (path.includes('privacy')) titleKey = 'pv_doc_title';
    else if (path.includes('terms')) titleKey = 'ts_doc_title';

    if (dict[titleKey]) {
        document.title = dict[titleKey];
    }

    // Meta description (keep crawler-visible metadata in sync with the active language)
    const descKey = titleKey === 'pv_doc_title' ? 'pv_meta_desc'
        : titleKey === 'ts_doc_title' ? 'ts_meta_desc'
        : 'meta_' + titleKey.replace('doc_title_', 'desc_');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict[descKey]) {
        metaDesc.setAttribute('content', dict[descKey]);
    }

    // Text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // HTML nodes
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    // Update language switch button text
    const label = document.getElementById('lang-label');
    if (label) {
        label.textContent = lang === 'zh' ? 'EN' : '中文';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ── 0. Apply i18n ──
    applyLanguage(currentLang);
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const next = currentLang === 'zh' ? 'en' : 'zh';
            applyLanguage(next);
        });
    }

    // ── 1. Typing effect ──
    const words = ["Today.", "Now.", "Together.", "Forever."];
    let wordIdx = 0, charIdx = 0, deleting = false;
    const el = document.getElementById('typing-text');

    function type() {
        if (!el) return;
        const w = words[wordIdx];
        if (deleting) { charIdx--; } else { charIdx++; }
        el.textContent = w.substring(0, charIdx);
        let speed = deleting ? 45 : 90;
        if (!deleting && charIdx === w.length) { speed = 2200; deleting = true; }
        else if (deleting && charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 400; }
        setTimeout(type, speed);
    }
    if (el) setTimeout(type, 600);

    // ── 2. Navbar scroll ──
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    // ── 3. Mobile hamburger ──
    const ham = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (ham && links) {
        ham.addEventListener('click', () => {
            links.classList.toggle('open');
            ham.classList.toggle('active');
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                ham.classList.remove('active');
            });
        });
    }

    // ── 4. Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId === '#') return;
            const t = document.querySelector(targetId);
            if (t) {
                e.preventDefault();
                t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── 5. Scroll reveal ──
    const revealEls = document.querySelectorAll(
        '.feature-card, .walkthrough-row, .pricing-card, .download-card, .section-header'
    );
    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
        revealObs.observe(el);
    });

    // ── 6. 3D Tilt for cards ──
    document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── 7. Waitlist form handler ──
    const form = document.getElementById('waitlist-form');
    const msg = document.getElementById('waitlist-message');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('waitlist-email');
            const email = emailInput ? emailInput.value.trim() : '';
            const btn = document.getElementById('waitlist-submit');
            if (!email) return;

            if (btn) btn.disabled = true;
            if (msg) {
                msg.textContent = currentLang === 'zh' ? '正在提交...' : 'Submitting...';
                msg.style.color = 'var(--cyan-light)';
            }

            try {
                const res = await fetch('https://api.freewaitlists.com/waitlists/cmp7tkfdd01o401qtuocoduii', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, meta: { source: 'eidolon-product-page' } })
                });
                if (res.ok) {
                    if (msg) {
                        msg.textContent = currentLang === 'zh' ? '订阅成功！您将收到 Eidolon 版本更新通知。' : 'Subscribed! You will receive Eidolon version updates.';
                        msg.style.color = 'var(--mint)';
                    }
                    if (emailInput) emailInput.value = '';
                } else {
                    if (msg) {
                        msg.textContent = currentLang === 'zh' ? '提交失败，请稍后重试或联系我们。' : 'Submission failed. Please try again later or contact us.';
                        msg.style.color = 'var(--danger, #ff6b81)';
                    }
                }
            } catch (err) {
                if (msg) {
                    msg.textContent = currentLang === 'zh' ? '提交失败，请稍后重试或联系我们。' : 'Submission failed. Please try again later or contact us.';
                    msg.style.color = 'var(--danger, #ff6b81)';
                }
            } finally {
                if (btn) btn.disabled = false;
            }
        });
    }
});
