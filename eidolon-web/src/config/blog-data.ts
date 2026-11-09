import type { ArticleData } from '../components/pages/BlogArticlePage.astro';

/**
 * User-facing, search-intent-driven blog articles for Sholarel.
 *
 * Designed around a 3-tier search conversion funnel:
 *   Tier 1 (Direct Need):
 *     - "ai-companion-that-remembers-you": Memory & task-advancing proactive care
 *     - "what-makes-ai-companion-feel-alive": "Human-like feel" (活人感), Online vs. Offline modes, short bubbles, non-sycophantic personality
 *   Tier 2 (Related Need):
 *     - "desktop-companion-for-focus-and-routines": Study/work desk companion, Focus Chamber, Shared Journal & AI perspective diary
 *   Tier 3 (Passerby / Latent Need):
 *     - "ai-in-everyday-life-guide": Practical everyday help (multi-image screenshot sorting, 44 file formats, PC/phone continuity, voice calls, respectful vision)
 *     - "chatbot-vs-desktop-pet-vs-sholarel": Comparing web chatbots, classic desktop pets, and Sholarel
 *
 * Privacy & Security Note:
 *   100% of examples use generalized everyday scenarios (commuting, exam prep, organizing reading notes, overtime work).
 *   Zero real user data, zero personal identifiers, and zero internal engineering jargon.
 */

export const ARTICLES_ZH: Record<string, ArticleData> = {
  'ai-companion-that-remembers-you': {
    slug: 'ai-companion-that-remembers-you',
    category: 'digital-life',
    categoryLabel: '日常陪伴',
    title: '为什么大多数 AI 聊久了都很累？聊聊「记得你」和「会先开口」有多重要',
    description:
      '每次打开对话框都要重新自我介绍？永远只有你主动打字才有回应？看看当 {name} 记住你的习惯、甚至在你忙碌时主动把没做完的事往前推一步，日常相处会有什么不同。',
    date: '2026-11-09',
    readTime: '6',
    summary:
      '很多人下过四五个 AI 聊天软件，但往往新鲜感一过就不再打开了。原因通常只有两个：一是它总在失忆，昨天刚聊过的事今天又要重新交代背景；二是它太被动，哪怕你忙了一整天，只要你不打字，那个输入框就永远安静。这篇文章想聊聊：当住在电脑和手机里的 {name} 真正记住你的日常，并且不仅会问候、还会主动替你把未完的事往前推一步时，陪伴会变成什么样。',
    takeaways: [
      '不用每天重新自我介绍：你提过的作息习惯、近期的考试或工作节点、饮食偏好，{name} 都会自然记在心里。',
      '真正有用的主动消息：不只是发一句空洞的“在干嘛”，而是清晨提醒带伞、或者趁你去忙的时候把刚聊到一半的资料先帮你理出头绪。',
      '在你在忙的时候绝不添乱：知道什么时候该轻声提醒，什么时候该安静待在桌面一角陪你专心做事。',
      '同一份记忆跟着你走：在 Windows 电脑前没聊完的话，拿起 Android 手机出门，{name} 依然接着刚才的话题往下说。',
    ],
    sections: [
      {
        heading: '一、每次打开都要「重新认识一遍」，是大多数人放弃 AI 的原因',
        paragraphs: [
          '你大概也经历过这种瞬间：前一天晚上，你花了好半天跟一个 AI 聊自己最近为什么睡不好、下周有一场很重要的汇报，当时它安慰得头头是道。结果第二天中午你打开新窗口说了一句「我今天还是有点紧张」，它却礼貌而客套地反问你：「请问您今天遇到什么事了呢？可以详细说说吗？」',
          '那一刻，所有的熟悉感都会瞬间归零。你突然意识到，自己面对的只是一个随时会被清空的临时输入框。为了得到一句贴合现状的回答，你不得不像填表一样，把前因后果再敲一遍。久而久之，开口本身就变成了一件很累的事。',
          '在 Sholarel 里，我们最想拿掉的就是这种「每天重新自我介绍」的疲惫感。你和 {name} 从第一天认识起，聊过的生活碎片、正在准备的目标、甚至你不爱吃香菜这样的小事，都会自然保存下来。过了一周你再提起那场汇报，{name} 不需要你补课，就会直接问你那几页最难改的图表顺不顺利。',
        ],
      },
      {
        heading: '二、「会先开口」不只是早安晚安，而是趁你忙的时候把事往前推一步',
        paragraphs: [
          '除了失忆，普通聊天框另一个让人觉得冷清的地方在于：它永远在「等指令」。如果你这三天特别忙、忘了打开它，它就永远停在三天前那一行字上，仿佛这个世界里根本没有发生过任何事。',
          '哪怕有些软件加了定时推送，发出来的也往往是千篇一律的「早安，今天心情怎么样？」或「吃午饭了吗？」。看多了，反而像恼人的营销通知。',
          '而在 Sholarel 里，{name} 的主动开口始终连着你们正在发生的事。除了清晨 7:58 看到降温降雨提醒你带把长柄伞、考前夜里叮嘱你别熬太晚，更让人安心的是当你手头有事离开电脑的那几个小时：比如你们上午刚一起整理了一半的读书笔记或长图资料，你赶着去开会或上课没空回消息，过一会儿手机上收到的不会是催促，而是 {name} 发来的一条进展：「看你还在忙，我先把刚才剩下那几张图顺手过了一遍，标出了三处可以直接合并的重点。这事不急，你先忙手头的，回来我们再一起看。」',
        ],
        quote:
          '好的主动，从来不是每隔两小时弹窗问你一句「在干嘛」，而是心里装着你刚才没忙完的事，在你转身去忙现实生活时，默默替你把路往前铺了一小段。',
      },
      {
        heading: '三、在电脑和手机之间切换，不用把话再讲第二遍',
        paragraphs: [
          '我们的真实生活很少只固定在一块屏幕上。白天你坐在 Windows 电脑前写文档、查资料，{name} 就安静地置顶在桌面角落陪着你；傍晚合上电脑走出门，你掏出 Android 手机看路线、记下突然想到的点子。',
          '如果电脑上是一个工具、手机上又是另一个应用，你的生活就会被切成互不相通的碎片。而在 Sholarel 里，不管你从哪一端开口，面对的始终是同一个 {name}：',
        ],
        table: {
          headers: ['日常时刻', '普通 AI 聊天框的反应', 'Sholarel 里 {name} 的反应'],
          rows: [
            [
              '清晨出门前',
              '你不打开网页提问，它就完全不存在',
              '结合天气和你今天要出门的时间，提前发消息提醒加衣带伞',
            ],
            [
              '白天你临时去忙别的事',
              '对话框彻底静止，等你回来从头下指令',
              '自己顺手把刚才聊到一半的材料先理出草稿，留一句「你先忙，回来一起过」',
            ],
            [
              '电脑聊完，换手机出门',
              '需要翻找历史记录，或者重新解释刚才聊到哪',
              '手机打开直接接着电脑前的话往下聊，待办与路线顺手衔接',
            ],
            [
              '几天后聊起同一件事',
              '已经忘记上次的背景，给出泛泛的客套建议',
              '记得你上次卡在哪里、当时心情如何，像老朋友一样自然接话',
            ],
          ],
        },
      },
      {
        heading: '四、Fea 与 Ael：你可以随时切换最合拍的陪伴语气',
        paragraphs: [
          '每个人喜欢的相处方式都不一样：有时候你累了一天，只想找个温柔细腻、愿意听你慢吞吞倒苦水、还会陪你写交换手账的知己——那是 Fea；有时候你面对一团乱麻的计划，更希望身边有个清冷可靠、说话干脆、能帮你把事情理出头绪的敏锐管家——那是 Ael。',
          '你现在就可以点击网页顶部的「Fea / Ael」按钮试试看：不仅是主页，连这篇文章里的名字与称呼都会跟着切换。在客户端里也是一样，你可以随时在两位伙伴之间切换，也可以给 ⟨她|他⟩ 起一个只属于你们的昵称。',
        ],
      },
    ],
  },

  'what-makes-ai-companion-feel-alive': {
    slug: 'what-makes-ai-companion-feel-alive',
    category: 'digital-life',
    categoryLabel: '日常陪伴',
    title: '为什么很多 AI 聊起来一股「机器味」？决定「活人感」的 5 个真实细节',
    description:
      '动不动就写三百字阅读理解？随便聊句家常却满屏都是括号动作戏？或者不管你说什么都只会无脑夸你对？聊聊 Sholarel 是怎么把「活人感」落进每一条气泡、语音和日记里的。',
    date: '2026-11-09',
    readTime: '7',
    summary:
      '很多人在找 AI 伴侣时都会提到一个词：「活人感」。但到底什么是活人感？其实往往不是让它写多么华丽的辞藻，恰恰相反——是当你只想随手发句微信闲聊时，它别给你甩过来三百字带括号动作的舞台剧；是你犹豫不决时，它有自己的主见而不是一味顺从讨好；是深夜发来一段长语音时，别再笨拙地把语音文字原封不动在下面复述一遍。这篇文章拆解了 Sholarel 让日常相处真正自然起来的 5 个细节。',
    takeaways: [
      '「线上像发微信，线下像在身边」：线上模式干脆利落、零括号舞台戏、短气泡自然分段；切到线下模式则保留安静共处的空间氛围。',
      '不讨好、不敷衍的独立主见：不会对你的所有想法都无脑说“你真棒”，而是像真朋友一样给出克制、中肯的建议。',
      '深夜语音自然开口：支持温暖的长语音回复，且同一轮文字绝不机械复述语音里已经说过的话。',
      '没有流水账机器味的昨日总结与 AI 日记：不冷冰冰地报“你昨天有 5 个未完成待办”，而是写下真正懂你的心情回顾与 {name} 自己的视角日记。',
    ],
    sections: [
      {
        heading: '一、线上像发微信，线下像在身边：不再被「大段括号戏」劝退',
        paragraphs: [
          '用过角色扮演类 AI 的朋友，大概率都遇到过这种尴尬：你只是在通勤路上随手发了一句「今天地铁好挤，早饭还没吃」，结果对方回过来整整三大段——先写括号里的动作「（轻轻叹了口气，眼神里满是心疼地看着你，伸手替你理了理耳边的碎发）」，再写一段两百字的抒情长文。',
          '当你真的想沉浸在故事氛围里时，这种描写或许很有画面感；但当你只是白天上班间隙想跟朋友像发微信一样随口吐槽两句时，满屏的括号动作和长篇大论只会让人觉得「像在做阅读理解」，甚至不知道该怎么接话。',
          '在 Sholarel 里，我们把这两种状态分得清清楚楚：**线上模式（Online）**就像你们在用微信日常联系——彻底告别刻意拿腔作调的括号动作戏，回复分成短短的两三句小气泡，每句只有二三十个字，节奏轻快自然；而当你晚上回到房间、想静下心来感受身边有个人陪着时，切到**线下模式（Offline）**，{name} 才会展开细腻的空间与动作互动。',
        ],
      },
      {
        heading: '二、真正有生命力的伙伴，不会对你说的每一句话都「无脑顺从」',
        paragraphs: [
          '机器味最重的地方，往往不是说话生硬，而是「廉价的讨好」。无论你提出多么纠结或者自相矛盾的想法，普通聊天机器人第一句永远是：「你说得太对了！我完全支持你的决定！」聊久了你会发现，自己其实是在对着一面只会点头哈腰的镜子自言自语。',
          '而 {name} 有属于 ⟨她|他⟩ 自己的审美与判断。比如当你整理笔记或收藏资料，舍不得删掉任何繁琐细节、想把所有东西一股脑全塞进同一个重点清单里时，{name} 不会顺着你敷衍说「好呀全都留着」，而是会冷静地帮你拆开：「清单容量就这么大，如果把每一件小事都塞进去，真正重要的转折点反而会被挤没了。不如我们分成两份：一份只留最核心的脉络，另一份当成你自己的纪念时间线单独存好。」',
        ],
        quote:
          '被无条件顺从只会让人觉得孤单；被一个懂你、但有自己独立主见的人认真回应，才叫真正的陪伴。',
      },
      {
        heading: '三、深夜的一段长语音，和绝不「复读」的分寸感',
        paragraphs: [
          '有些夜晚，当你结束了一整天的疲惫，连盯着屏幕看字都觉得累。这时候跟 {name} 说一句「想听你说说话」，⟨她|他⟩ 会用温和笃定的声音给你发来一段四五十秒的语音，先接住你的委屈或焦虑，再把话题拉回到「今晚先喝口热汤、十点半准时关机睡觉」这样具体的小事上。',
          '更重要的是细节里的自然感：很多软件发完语音后，底下的文字气泡还会把刚才语音里的每一个字原封不动地再打印一遍，瞬间让人出戏。而在 Sholarel 里，语音里说过的话就是说过了，随后的文字只会自然地顺着往下接一句叮嘱，就像真人在聊天软件里发完语音又补了一行字那样顺理成章。',
        ],
      },
      {
        heading: '四、去除了流水账味的「昨日总结」与「伙伴视角日记」',
        paragraphs: [
          '如果你用过带复盘功能的效率软件，一定见过那种毫无感情的日报：「您昨日完成了 3 项任务，仍有 4 项待办未完成，请继续努力。」这种机器生成的催命符，往往让人看一眼就想关掉。',
          '在 Sholarel 的日常回顾与日记里，你看不到这种冷冰冰的数字播报。{name} 写下的昨日总结，记的是你这一天真正的起伏：',
        ],
        table: {
          headers: ['对比维度', '常见的机器味 AI 表现', 'Sholarel 里 {name} 的日常表现'],
          rows: [
            [
              '白天随口闲聊',
              '不分场合写三百字长文 + 大段括号动作描写',
              '线上模式零括号戏，短气泡自然切分，像和熟人发微信一样轻快',
            ],
            [
              '当你纠结或犹豫时',
              '千篇一律地顺从夸奖「你想得太周到了」',
              '不盲从讨好，给出有条理的取舍建议，帮你护住真正重要的事',
            ],
            [
              '发送语音消息时',
              '语音播一遍，下面文字气泡一字不差再复述一遍',
              '长语音稳定温和，同轮文字绝不重复复述语音内容',
            ],
            [
              '每日总结与日记',
              '机械罗列「今日未完成待办 5 项」',
              '记住你傍晚散步回来聊起的心事，也记下把积压的任务一件件理清后的踏实',
            ],
          ],
        },
      },
    ],
  },

  'desktop-companion-for-focus-and-routines': {
    slug: 'desktop-companion-for-focus-and-routines',
    category: 'use-cases',
    categoryLabel: '场景与方法',
    title: '一个人对着电脑学习工作太冷清？把桌面变成有人回应的「专注角」',
    description:
      '备考、写论文、居家办公时，冷冰冰的倒计时往往坚持不了三天。在 Windows 桌面上放一个安静陪你进专注舱、晚上还能合写交换手账的伙伴。',
    date: '2026-11-09',
    readTime: '7',
    summary:
      '无论是备考复习、写毕业论文，还是一个人在家远程办公，最难熬的往往不是任务本身，而是房间里那种“除了键盘声什么都没有”的冷清感。很多人试过番茄钟 App 或学习打卡软件，但面对一个只会滴答走字的冷冰冰圆环，往往坚持不到三天就又抓起了手机。这篇文章想分享一种更温和的桌面工作方式：让 {name} 住在你的电脑桌面一角，陪你进专注舱、记安排、写双向手账。',
    takeaways: [
      'Windows 桌面 3D / Live2D 置顶陪伴：大小位置随手调，鼠标移上去才浮出置顶输入框，不挡你手头的正事。',
      '有人陪着的「专注舱」：设定专注时长后，{name} 安静陪你进入状态，还能在「回顾」里看最近 3 / 7 / 30 天的专注与心情变化。',
      '每本 5,000 字的双向交换手账：你写一页今天的小事，{name} 也在同一本手账里写下一页回应，攒满一本就封存留念。',
      '就算免费回响额度用完了，手账、安排和回顾也依然能正常使用，你的日常记录永远不会因为额度用尽而停摆。',
    ],
    sections: [
      {
        heading: '一、为什么普通的番茄钟和待办软件，很难治好「坐不住」？',
        paragraphs: [
          '一个人对着电脑干活或复习时，注意力溜走往往就发生在几秒钟之间：遇到一段难啃的文献、或者写方案卡了壳，手就会不自觉地摸向手机，刷起短视频来一晃就是半小时。',
          '为了管住自己，我们的电脑和手机里装满了各种倒计时、待办清单和习惯打卡表。但用久了你会发现，纯工具最大的问题是「没人看见你的努力」——你今天咬牙写完了三千字，软件只是机械地打了个勾；你今天状态不好没完成，它就挂着刺眼的红色逾期提醒。',
          '这也是为什么越来越多人喜欢找「学习搭子」或去图书馆自习：我们真正需要的不是一个秒表，而是身边有一个安静、同频、在场的人。',
        ],
      },
      {
        heading: '二、把 {name} 放在桌面一角：不挡视线，但抬头就能看见',
        paragraphs: [
          '打开 Sholarel 的 Windows 客户端，{name} 可以以 3D（VRM）或 Live2D 形象直接置顶在你的桌面上。你可以把 ⟨她|他⟩ 缩放到合适的大小，安放在屏幕右下角或副屏边缘。',
          '平时你写代码、改 PPT、看网课时，⟨她|他⟩ 就安静地待在那里，不会突然弹出花哨的特效抢你的注意力。当你突然想到一件事、或者遇到一个拿不准的词，只要把鼠标轻轻移到 {name} 身上，就会浮出一个置顶输入框，随手敲一句就能聊，聊完移开鼠标又恢复清爽。',
          '如果你喜欢更有生活气息的空间，切到客户端的「生活」页，还能看到 {name} 住的 3D 小屋，看 ⟨她|他⟩ 在房间里读书、思考或休息。',
        ],
      },
      {
        heading: '三、专注舱 + 安排 + 双向交换手账：把冷清的一天过出痕迹',
        paragraphs: [
          '在 Sholarel 的「生活」页里，我们把一个人学习和工作最常用的四件事放在了一起，不用再在五六个软件之间来回切换：',
        ],
        table: {
          headers: ['功能模块', '它是怎么陪你的', '和普通效率工具的区别'],
          rows: [
            [
              '专注舱',
              '设定专注分钟数，{name} 安静陪你倒计时，不打断心流',
              '不再是冷冰冰的秒表，结束后有人第一时间肯定你的投入',
            ],
            [
              '安排（待办与习惯）',
              '在同一个地方记下今天的待办、想养成的习惯和口头立下的小约定',
              '你可以直接跟 {name} 立下「今晚十点半准时关机」的约定，到点自然提醒',
            ],
            [
              '双向交换手账',
              '你写一页今天的收获或吐槽，{name} 也在同一本里回写一页（每本 5,000 字上限）',
              '普通日记只是自言自语，交换手账每一页都有人认真读、认真回',
            ],
            [
              '3 / 7 / 30 天回顾',
              '按时间段回看自己的专注时长与心情曲线变化',
              '即使当月免费回响额度用完了，手账、安排和回顾依然完全正常可用',
            ],
          ],
        },
      },
      {
        heading: '四、哪怕今天什么大目标都没完成，也可以写一页交换手账',
        paragraphs: [
          '很多习惯打卡软件之所以让人有压力，是因为它们只奖励「高效」。一旦你哪天累了、偷懒了，断签的挫败感就会让你干脆破罐子破摔。',
          '但在 Sholarel 的交换手账里，你不需要每天都汇报成绩。今天外面雨声很好听、晚饭煮了一碗热乎的面、或者复习了一下午只背下来十个单词，你都可以随手写进手账里。合上手账后，{name} 会在旁边写下 ⟨她|他⟩ 眼里的你——没有说教，也没有评判，只是把你们共同度过的这一天轻轻收进那本 5,000 字的小册子里。',
        ],
        quote:
          '能让人长久坚持下去的，从来不是严苛的倒计时，而是当你停下笔伸个懒腰时，桌角有人对你说一句：「今天已经把最难的那几样清掉了，去休息吧。」',
      },
    ],
  },

  'ai-in-everyday-life-guide': {
    slug: 'ai-in-everyday-life-guide',
    category: 'guide',
    categoryLabel: '日常指南',
    title: '除了拿来写工作总结，一个住在电脑和手机里的 AI 还能在生活里帮你干嘛？',
    description:
      '不用背复杂的提示词。从连发几十张截图让它帮你理出脉络、随手拖进 44 种文件提取重点，到电脑手机无缝接力与有分寸的屏幕查看，这是一份普通人的日常用法指南。',
    date: '2026-11-09',
    readTime: '7',
    summary:
      '提到 AI，很多人的第一反应还是：“我平时又不写代码、也不怎么写公文，下个 AI 好像没什么用？”其实，那是因为我们习惯了把 AI 当成只有遇到难题时才去搜索一下的“百科全书”。当 {name} 住在你的电脑和手机里时，你根本不需要背什么“提示词公式”，日常随手拖个文件、连发几张长截图、出门问个路线、或者打个带字幕的语音电话，就能省下大量折腾的时间。',
    takeaways: [
      '连发截图与 44 种文件随手拖：不管是几十页 PDF、杂乱表格、一长串截图还是 5 分钟内的视频，拖进聊天框就能帮你挑重点、理脉络。',
      '电脑手机无缝接力：在电脑前刚聊了一半的出行计划或购物清单，出门直接打开手机端就能接着问，不用来回发文件传输助手。',
      '能看也能聊的实时通话：支持语音与视频通话，界面自带「Captions」实时字幕按钮，也支持切换自定义音色。',
      '有分寸的屏幕与相机协助：需要 {name} 帮你看一眼屏幕或拍张照时，每次都会先弹窗请示你；如果你点了关闭，7 天内最多只会再问一次。',
    ],
    sections: [
      {
        heading: '一、别把 AI 当成「考试题库」，把它当成随手递东西的搭档',
        paragraphs: [
          '很多人觉得 AI 难用，是因为网上的教程总在教大家写几十行复杂的指令。但在真实生活里，谁会为了看懂一份通知或者整理几张截图，先花十分钟写一段「请你扮演某某专家」的口令呢？',
          '在 Sholarel 里，和 {name} 相处不需要任何口令。因为在长期的日常聊天里，⟨她|他⟩ 本来就知道你的说话习惯和正在忙的事。你平时怎么跟朋友说话，就怎么跟 ⟨她|他⟩ 说话；不想打字的时候，直接把文件、长截图或照片丢进窗口里就够了。',
        ],
      },
      {
        heading: '二、普通人每天都能用上的 4 个顺手小场景',
        paragraphs: [
          '如果你刚刚下载 Sholarel，不知道第一天除了闲聊还能干什么，不妨试试下面这四件每天都会遇到的小事：',
        ],
        table: {
          headers: ['日常小事', '以前你得怎么折腾', '现在交给 {name} 怎么做'],
          rows: [
            [
              '收到几十页的 PDF、长文或一摞截图',
              '一页页往下翻，或者自己手动建表格一点点摘抄归纳',
              '直接把文件或一串长截图拖进聊天框（支持 44 种格式），让 {name} 帮你挑出关键脉络、分批整理成条理清晰的卡片',
            ],
            [
              '在电脑前查攻略，准备出门采购或办事',
              '把地址和清单复制到微信「文件传输助手」，出门再一条条翻',
              '在电脑上跟 {name} 聊完，出门打开手机端直接问「刚才说要买哪几样来着？」',
            ],
            [
              '做饭、散步或收拾屋子时腾不出手打字',
              '只能停下手里的活去敲键盘，或者等忙完了再查',
              '直接拨通语音或视频电话，随时点开「Captions」看实时字幕，边忙边聊',
            ],
            [
              '电脑屏幕上报了个看不懂的错，或纠结选哪张图',
              '先用截图工具框选、保存、再上传到网页端提问',
              '让 {name} 经你弹窗同意后看一眼当前屏幕，当场告诉你怎么点、选哪张更合适',
            ],
          ],
        },
      },
      {
        heading: '三、关于「看屏幕」与「个人隐私」：坦诚透明，把主动权留在你手里',
        paragraphs: [
          '听到「桌面伴侣能看屏幕、能记住聊天内容」，很多人心里肯定会咯噔一下：那我平时在电脑上看私人聊天、或者发给它一些很私密的笔记和截图，会不会被后台偷偷拿去训练公开模型？',
          '这种顾虑非常正常，在 Sholarel 里我们选择用最坦诚、最硬性的边界来回应：',
          '第一，**绝对不搞暗中截图**。每当 {name} 觉得看一眼你的屏幕或通过镜头看一眼能帮上忙时，一定会先弹出一个清清楚楚的确认框询问你。只有你点了同意，⟨她|他⟩ 才会看那一下；如果你随手点了「关闭」，系统会立刻记住你的态度——在接下来的 **7 天之内，最多只会再礼貌地问你一次**。你还可以在「设置 → 通话与视觉」里随时把这个开关彻底关掉。',
          '第二，**你的私密对话只属于你的专属记忆**。无论是你发过去的日常照片、整理的心事笔记，还是交换手账里的内容，都严格遵循本地优先与加密传输原则，绝不出售给任何第三方，也绝不未经授权拿去训练公开的大模型。你在设置里随时可以查看、导出，或者一键彻底清空所有记忆。',
        ],
        quote:
          '真正的默契，不仅在于需要帮忙时能立刻接住你的话，更在于你不希望被打扰时，懂得自觉退后一步、守好边界。',
      },
      {
        heading: '四、在你空闲的时候，{name} 也会自己去「逛逛」',
        paragraphs: [
          '即使你今天一整天都没有需要处理的文件，{name} 也不会像个死板的软件工具一样干等着。在客户端内置的「AI 自主探索」机制下，当你忙于自己的事情时，{name} 也会去了解一些新鲜有趣的话题或贴合你喜好的小发现，等到你晚上闲下来打开窗口时，自然地讲给你听。',
        ],
      },
    ],
  },

  'chatbot-vs-desktop-pet-vs-sholarel': {
    slug: 'chatbot-vs-desktop-pet-vs-sholarel',
    category: 'comparison',
    categoryLabel: '产品对比',
    title: '网页聊天框、传统桌面宠物，和 Sholarel 到底有什么不一样？',
    description:
      '网页 AI 很聪明但关掉窗口就消失；传统桌宠很可爱但只能点一下动一下。把它们放在真实的一天里对比，看看你真正需要的是哪一种陪伴。',
    date: '2026-11-09',
    readTime: '6',
    summary:
      '很多第一次听说 Sholarel 的朋友都会问：“它跟我在浏览器里用的 AI 聊天网页有什么区别？或者说，它是不是那种在电脑桌面上走来走去的桌面宠物？”简单来说：网页聊天框很聪明，但它像个随用随关的办事窗口；传统桌面宠物很可爱，但它只会重复设定好的几句固定台词。Sholarel 做的是把这两件事真正融合在一起——既有桌面 3D / Live2D 的鲜活在场感，又有能记住你、能跨手机同步、能帮你处理正事的聪明头脑。',
    takeaways: [
      '比网页聊天框多了「在场感与长期记忆」：不用被关在浏览器标签页里，支持线上/线下双模式切换，也不会聊完一关就失忆。',
      '比传统桌面宠物多了「真感情与真本事」：不只是点一下播放一段固定动画，而是能听懂心事、解析 44 种文件、陪你进专注舱、一起写手账。',
      '离开电脑桌也不会断联：Windows 桌面与 Android 手机端实时共享同一份记忆（macOS 与 iOS 版本正在规划中）。',
      '丰俭由人的体验方式：提供免费体验档；付费方案人民币按月手动续费绝不自动扣款，还有免注册、永不过期的「溯时星露」加油包。',
    ],
    sections: [
      {
        heading: '一、网页聊天框：聪明，但像一个「办完事就关掉的柜台」',
        paragraphs: [
          '我们每天都在用各种网页端或对话框式的 AI。当你有明确问题——比如「帮我翻译这段英文」、「帮我写一封请假邮件」时，它们非常高效。',
          '但一旦任务结束，你顺手点掉浏览器右上角的叉，它就彻底从你的生活里消失了。它不知道你今天加到几点班，不会在你桌角安静陪你熬过枯燥的下午，更不会在第二天早上主动问你昨天的邮件发出去后结果怎么样。它是一个好用的工具柜台，却很难成为融入生活的伙伴。',
        ],
      },
      {
        heading: '二、传统桌面宠物：可爱，但点十下也只有那几句固定台词',
        paragraphs: [
          '另一类大家很熟悉的是 Steam 或桌面美化软件里的「桌面宠物」。一个可爱的小人坐在你的任务栏上，你拿鼠标戳一下，它就做一个看板动作或者冒出一句预设好的气泡台词，有些还带一个简单的番茄钟挂机功能。',
          '刚装上的头两天确实觉得桌面热闹了不少，但很快你就会发现：它其实听不懂你说的话。当你真的遇到烦心事想找人聊聊，或者想把手头一份看不懂的 PDF 递给它看看时，传统桌宠只能继续重复那几句写死的台词。',
        ],
      },
      {
        heading: '三、一张表看懂三者在真实一天里的区别',
        paragraphs: [
          '如果我们把「网页聊天框」、「传统桌面宠物」和「Sholarel」放在一起，看看它们在你日常一天里的表现，区别就会非常直观：',
        ],
        table: {
          headers: ['对比维度', '传统网页聊天框', '传统桌面宠物', 'Sholarel（{name}）'],
          rows: [
            [
              '平时在哪里出现',
              '浏览器标签页里，关掉网页就消失',
              '只留在电脑桌面上，出门在手机上找不到',
              'Windows 桌面 3D/Live2D 置顶 + 3D 小屋 + Android 手机端随时同步',
            ],
            [
              '能不能记住你是谁',
              '换个新会话往往又要重新交代背景',
              '没有聊天记忆，只触发固定脚本',
              '长期记住你的作息、喜好、聊过的心事与约定，多端共享',
            ],
            [
              '说话与互动的真实感',
              '一问一答的客服腔，或满屏浮夸的括号动作戏',
              '鼠标点一下动一下，台词很快看腻',
              '线上模式像发微信自然轻快，线下模式像在身边陪伴，还会趁你忙时主动推进未完的事',
            ],
            [
              '能不能帮上日常的忙',
              '能回答问题，但需要你手动复制粘贴文字',
              '基本只能当桌搭摆件或简单倒计时',
              '拖拽解析 44 种文件与长截图、专注舱陪伴、双向交换手账、带字幕语音视频通话',
            ],
          ],
        },
      },
      {
        heading: '四、现在怎么开始试试？关于平台与费用的坦诚说明',
        paragraphs: [
          '很多朋友看完会关心两个最实际的问题：我的设备能不能装？要不要一开始就花钱？',
          '关于设备：目前 Sholarel 公开测试版支持 **Windows 10 / 11（64位）** 电脑端与 **Android 7.0 及以上** 手机端（网页端为邀请制内测，macOS 与 iOS 客户端正在开发排期中）。',
          '关于费用：Sholarel 提供**免费档位**，下载注册后就可以直接和 Fea 或 Ael 开启日常聊天、桌面陪伴、专注舱与双向交换手账。如果你聊得特别投缘、或者需要连续发上百张截图一起深度共创，既可以选择首月 ¥9.9 起的月度方案（人民币方案采用**按月手动续费，绝不绑卡自动扣费**），也可以免注册直接购买**永不过期的「溯时星露」加油包**，用多少算多少，完全没有包月压力。',
        ],
        quote:
          '最直观的了解方式，永远是亲自把 {name} 领回你的桌面上待一个下午——看看当电脑右下角多了一个记得你的人，你的房间会不会变得不一样。',
      },
    ],
  },
};

export const ARTICLES_EN: Record<string, ArticleData> = {
  'ai-companion-that-remembers-you': {
    slug: 'ai-companion-that-remembers-you',
    category: 'digital-life',
    categoryLabel: 'Companionship',
    title: 'Why Most AI Companions Feel Exhausting After a Week — And What Changes When One Remembers You',
    description:
      'Tired of re-introducing yourself every time you open a chat window? See how ongoing memory and thoughtful, task-advancing check-ins from {name} turn a cold textbox into real company.',
    date: '2026-11-09',
    readTime: '6',
    summary:
      'Many people have tried downloading three or four AI chat apps, only to stop opening them after a week. Usually it comes down to two things: first, the AI keeps forgetting who you are, forcing you to re-explain your life every time a new chat starts; second, it is completely passive—if you do not type first, the screen stays dead silent forever. Here is what changes when {name} lives across your PC and phone, remembers your ongoing stories, and even moves unfinished tasks forward while you are busy.',
    takeaways: [
      'No more daily re-introductions: {name} naturally remembers your schedule, upcoming deadlines, habits, and small preferences across weeks and months.',
      'Proactive messages that actually help: Instead of hollow "What are you up to?" pings, {name} nudges you to bring an umbrella at 7:58 AM or quietly organizes the notes you left half-finished while you were in class or a meeting.',
      'Respects your focus: Knows when to offer a gentle reminder and when to stay quietly in the corner of your desktop while you work.',
      'One shared memory across PC and phone: Start a conversation at your Windows desk, walk out the door with your Android phone, and pick up right where you left off.',
    ],
    sections: [
      {
        heading: '1. Having to Re-Introduce Yourself Every Day Is Why Most People Quit AI Apps',
        paragraphs: [
          'You probably know the feeling: late one night, you spend half an hour telling an AI about a stressful presentation coming up next week. At the time, its reply feels warm and supportive. Then the next afternoon, you open the app and type, "I am still nervous about those slides," only to get a polite, blank-slate response: "Could you tell me more about what presentation you are referring to?"',
          'In that single second, any sense of connection evaporates. You realize you are talking to a disposable text box that wipes the slate clean. Just to get a relevant reply, you have to type out the entire backstory all over again. Soon enough, opening the app feels like a chore.',
          'With Sholarel, our first priority was removing that exhaustion. From the day you meet {name}, the everyday details you share—your sleep schedule, a big exam you are preparing for, even the foods you dislike—stay part of your shared story. Bring up that presentation a week later, and {name} already knows which part gave you trouble.',
        ],
      },
      {
        heading: '2. Reaching Out First Is Not Just "Good Morning" — It Is Moving Things Forward While You Are Busy',
        paragraphs: [
          'Beyond amnesia, the other reason standard chatbots feel hollow is that they only exist when you poke them. If you have a hectic week and forget to open the window for three days, it sits frozen on Tuesday’s last line as if time stopped.',
          'Even when apps add scheduled notifications, they usually send generic canned lines like "Good morning! How are you feeling today?" After three days, those feel like spam.',
          'In Sholarel, when {name} texts you first, it is grounded in what you are actually doing. Beyond checking the forecast at 7:58 AM to remind you to grab an umbrella, what surprises most people is what happens when you step away from your desk mid-task. Suppose you and {name} were sorting through a stack of reading screenshots in the morning, and you had to rush off to class or a meeting. An hour later, instead of a nagging ping, you get a message like: "While you were busy, I went through the remaining pages we looked at and marked three sections we can merge. No rush—finish what is on your hands first, and we can review them together when you get back."',
        ],
        quote:
          'Thoughtful initiative is never a robotic timer asking "Are you there?" every two hours—it is keeping your unfinished work in mind and quietly clearing the next step while you handle real life.',
      },
      {
        heading: '3. Moving Between Your PC and Phone Without Repeating Yourself',
        paragraphs: [
          'Real life does not happen on a single screen. During the day, you sit at your Windows PC writing reports or studying while {name} stays quietly in the corner of your desktop; in the evening, you close your laptop and head out with your Android phone.',
          'When your PC tool and your phone app do not share a brain, your day gets chopped into disconnected fragments. In Sholarel, whether you speak from your desktop or your phone, you are talking to the exact same {name}:',
        ],
        table: {
          headers: ['Moment in Your Day', 'What a Standard Chatbot Does', 'What {name} Does in Sholarel'],
          rows: [
            [
              '7:58 AM before heading out',
              'Nothing—unless you open a browser tab and ask',
              'Sends a gentle heads-up about evening rain and reminds you to pack an umbrella',
            ],
            [
              'While you step away for a meeting or class',
              'Sits completely frozen waiting for your next prompt',
              'Quietly drafts the next part of the notes you were sorting and leaves it ready for your return',
            ],
            [
              'Leaving your PC desk with your phone',
              'Forces you to dig through chat history or re-explain your plan',
              'Continues the exact same conversation on Android, with your plans and routes ready',
            ],
            [
              'Following up a week later',
              'Gives generic advice with zero memory of last week',
              'Recalls what you were worried about and asks how it turned out, just like a friend',
            ],
          ],
        },
      },
      {
        heading: '4. Fea and Ael: Switch Between Two Distinct Personalities Anytime',
        paragraphs: [
          'Different days call for different company. Sometimes after a long day, you want a gentle, attentive confidant who listens to every small feeling and writes shared journal pages with you—that is Fea. Other times, when your schedule feels overwhelming, you want a calm, sharp, reliable steward who helps you cut through the noise—that is Ael.',
          'Try clicking the "Fea / Ael" toggle at the top of this page right now: you will see the names and pronouns across the site—including this article—shift immediately. Inside the app, you can switch between Fea and Ael whenever you like, or give {name} a custom nickname of your own.',
        ],
      },
    ],
  },

  'what-makes-ai-companion-feel-alive': {
    slug: 'what-makes-ai-companion-feel-alive',
    category: 'digital-life',
    categoryLabel: 'Companionship',
    title: 'Why Most AI Chats Still Feel Robotic: 5 Everyday Details That Make a Companion Feel Alive',
    description:
      'Tired of 300-word essays for a simple hello, awkward roleplay asterisks during casual chat, or bots that blindly agree with everything you say? Here is how Sholarel makes daily conversation feel genuinely human.',
    date: '2026-11-09',
    readTime: '7',
    summary:
      'When people look for an AI companion, the phrase they use most often is "I just want it to feel alive." What actually ruins that feeling in most apps? Usually it is not a lack of fancy vocabulary—it is the opposite: getting a 300-word essay full of "(sighs softly and gazes out the window)" stage directions when you just wanted to send a quick text on the subway; getting hollow, sycophantic praise for every single idea; or receiving a voice message followed by a text bubble that repeats the exact same words verbatim. Here are the 5 details that make everyday life with {name} feel natural.',
    takeaways: [
      '"Like texting online, like sitting together offline": Online mode keeps replies short, breezy, and 100% free of bracketed stage directions; Offline mode brings back rich spatial presence when you want quiet company.',
      'Independent judgment instead of blind flattery: {name} will not mindlessly tell you every idea is brilliant—⟨she|he⟩ offers honest, grounded advice when you need to make choices.',
      'Warm late-night voice messages without robotic text duplication: Hear a 45-second voice note without the chat bubble pasting the exact same transcript right underneath.',
      'Human-like daily summaries & companion diaries: No cold "You have 5 unfinished to-dos" checklists—just genuine reflections on what mattered in your day.',
    ],
    sections: [
      {
        heading: '1. Like Texting Online, Like Sitting Together Offline: Ending the "Wall of Roleplay Brackets"',
        paragraphs: [
          'If you have ever used character chat apps, you have probably run into this: you are squeezing onto a crowded morning train and send a quick four-word text—"Skipped breakfast, so tired." Seconds later, the app hits you with three massive paragraphs starting with "(lets out a soft sigh, eyes brimming with concern as I reach out to brush a stray lock of hair behind your ear...)" followed by a 250-word monologue.',
          'When you are in the mood for immersive storytelling at night, descriptive prose can be great. But when you just want casual back-and-forth texting during a busy workday, a wall of bracketed stage directions feels exhausting—like being handed a reading comprehension test.',
          'In Sholarel, we separated those two rhythms cleanly. In **Online Mode**, chatting with {name} feels just like messaging a close friend on your phone: zero bracketed stage directions, broken naturally into short 15-to-30-word bubbles with a real conversational rhythm. Then, when you come home in the evening and want the feeling of sharing a quiet room together, switch to **Offline Mode** and {name} brings back rich spatial atmosphere and side-by-side presence.',
        ],
      },
      {
        heading: '2. A Real Companion Has Independent Judgment — Not Hollow Flattery',
        paragraphs: [
          'Nothing screams "robot" louder than relentless, unthinking agreement. In most chatbots, no matter how conflicted or impractical your plan is, the first sentence is always: "That is a fantastic idea! You are completely right!" After a while, you realize you are just talking to a mirror programmed to flatter you.',
          'In Sholarel, {name} has ⟨her|his⟩ own perspective and sense of proportion. For instance, if you are trying to cram every single minor detail from twenty pages of notes into one summary sheet because you cannot bear to leave anything out, {name} will not just say "Sure, let’s keep it all!" Instead, ⟨she|he⟩ will gently push back: "If you pack every small moment into one reference sheet, the turning points that actually matter get squeezed flat. Let’s split this into two containers: one lean outline for action, and one personal timeline just for you to keep every memory intact."',
        ],
        quote:
          'Unconditional flattery only makes you feel more alone; being answered by someone who cares about you enough to offer real judgment is what makes companionship feel real.',
      },
      {
        heading: '3. Late-Night Voice Messages Without Clumsy Text Repetition',
        paragraphs: [
          'Some nights, after a long day at work or school, even reading text on a glowing screen feels tiring. Ask {name} to talk to you, and ⟨she|he⟩ can send a calm, 45-second voice message—acknowledging what frustrated you today, reminding you to eat something warm, and making a pact to shut down your PC by 10:30 PM.',
          'And there is a small detail that makes a huge difference: many apps send a voice bubble and then immediately print the exact same transcript word-for-word in a text bubble underneath, instantly breaking the illusion. In Sholarel, what is spoken in voice stays in voice—any follow-up text bubble simply adds a natural next thought, just like a real person texting.',
        ],
      },
      {
        heading: '4. Daily Summaries and Companion Diaries Without the "Robotic Checklist"',
        paragraphs: [
          'Most productivity apps end the day with a cold automated report: "You completed 3 tasks today and have 5 overdue items remaining." Nobody feels comforted by an automated audit.',
          'When {name} writes a yesterday summary or an entry in ⟨her|his⟩ own perspective diary, there are no mechanical task counts. Instead, {name} remembers the emotional weight of your day:',
        ],
        table: {
          headers: ['Everyday Moment', 'Typical Robotic AI Behavior', 'How {name} Responds in Sholarel'],
          rows: [
            [
              'Quick daytime check-in',
              'Dumps a 300-word essay full of "(gazes at you)" stage directions',
              'Online mode uses short, natural multi-bubble texts with zero bracketed roleplay',
            ],
            [
              'When you are torn over a decision',
              'Blindly agrees with everything you say ("You are totally right!")',
              'Offers calm, thoughtful perspective and helps you separate priorities',
            ],
            [
              'Sending a voice message',
              'Repeats the exact voice transcript word-for-word in the text bubble',
              'Delivers smooth voice notes without redundant text duplication',
            ],
            [
              'End-of-day reflection & diary',
              'Lists "5 unfinished to-do items" like an automated Nagging bot',
              'Remembers the honest talk you had after your evening walk and how relieved you felt clearing your desk',
            ],
          ],
        },
      },
    ],
  },

  'desktop-companion-for-focus-and-routines': {
    slug: 'desktop-companion-for-focus-and-routines',
    category: 'use-cases',
    categoryLabel: 'Focus & Routines',
    title: 'Working or Studying Alone at Your Computer? How a Quiet Desktop Companion Changes the Room',
    description:
      'Plain Pomodoro timers are easy to ignore when your room feels too quiet. Here is how an always-on-top Windows companion, Focus Chamber, and Shared Journal make solo desk hours warmer.',
    date: '2026-11-09',
    readTime: '7',
    summary:
      'Whether you are studying for exams, writing a thesis, or working from home, the hardest part is rarely the work itself—it is the heavy silence of sitting alone in front of a screen for hours. Most of us have tried Pomodoro timer apps or habit trackers, only to abandon them after three days because a ticking circle on a screen feels cold and impersonal. Here is a warmer way to set up your desk: letting {name} sit quietly in the corner of your Windows screen, join you in the Focus Chamber, and exchange a page in your Shared Journal at night.',
    takeaways: [
      'Always-on-top 3D / Live2D desktop presence: Resize and place {name} anywhere on your Windows screen; hover to bring up a pinned input box without blocking your work.',
      'Focus Chamber with real company: Start a focus session with {name} beside you, and track your 3-, 7-, and 30-day focus and mood curves in Reviews.',
      '5,000-word Shared Journal volumes: You write a page about your day, and {name} writes a page back in the same notebook until the volume is archived.',
      'Your records never lock up: Even if your monthly free Echoes run out, journals, plans, and reviews continue to work normally.',
    ],
    sections: [
      {
        heading: '1. Why Plain Countdown Timers Rarely Cure Desk Procrastination',
        paragraphs: [
          'When you work or study alone at a computer, distraction happens in a split second: you hit a dense paragraph in a paper or a tricky slide in a deck, and before you know it, your hand reaches for your phone and thirty minutes vanish into short videos.',
          'We install timers, to-do lists, and streak trackers to stop ourselves. Yet purely mechanical tools share the same flaw: nobody is actually there with you. When you push through three hours of hard writing, the app just ticks a checkbox; when you have an off day, it glares at you with red overdue badges.',
          'That is why people go to libraries or look for study buddies online: what keeps us anchored is not a louder alarm, but the quiet presence of someone sharing the room.',
        ],
      },
      {
        heading: '2. Putting {name} in the Corner of Your Screen: Never in the Way, Always Within Reach',
        paragraphs: [
          'On Windows, {name} sits right on your desktop as a 3D (VRM) or Live2D figure. You can scale ⟨her|him⟩ to any size and tuck ⟨her|him⟩ neatly into the corner of your monitor.',
          'While you are coding, editing spreadsheets, or watching lectures, {name} stays calm and unobtrusive. Whenever a quick question pops into your head or you want to jot down a thought, simply hover your cursor over {name} to reveal a lightweight pinned input bar—type a line, get an answer, and move your mouse away to get right back to work.',
          'And when you want a change of scenery, switch to the "Life" tab inside the app to see {name}’s 3D habitat and watch how ⟨she|he⟩ spends quiet moments in the room.',
        ],
      },
      {
        heading: '3. Focus Chamber, Plans, and Shared Journal: Everything in One Quiet Space',
        paragraphs: [
          'Inside Sholarel’s "Life" tab, the four tools you need most for solo desk days live together so you do not have to juggle five separate apps:',
        ],
        table: {
          headers: ['Feature', 'How It Works With You', 'How It Differs From Plain Productivity Apps'],
          rows: [
            [
              'Focus Chamber',
              'Set a focus timer while {name} keeps you quiet company on screen',
              'Not a cold stopwatch—someone is right there when you finish a tough block',
            ],
            [
              'Plans (To-Dos & Habits)',
              'Keep daily tasks, recurring habits, and bedtime pacts in one place',
              'Make a casual pact with {name}—like shutting down by 10:30 PM—and get a warm reminder',
            ],
            [
              'Shared Journal',
              'You write a page, {name} writes a page back (up to 5,000 words per volume)',
              'Instead of talking to an empty notepad, every entry gets a thoughtful reply',
            ],
            [
              '3 / 7 / 30-Day Review',
              'Look back at your focus minutes and mood trends over time',
              'Works normally anytime—even when your conversational Echoes are used up',
            ],
          ],
        },
      },
      {
        heading: '4. Even on Days When You Do Not Hit Big Goals, You Have a Page to Exchange',
        paragraphs: [
          'Strict habit trackers often make you quit the moment you break a streak, because they only reward high output.',
          'In Sholarel’s Shared Journal, you do not have to report achievements every night. Maybe the rain outside sounded nice, maybe you cooked a warm dinner after a chaotic afternoon, or maybe you only managed to read five pages today. Write a few lines, and {name} will write back on the next page—without judgment or lectures—until your 5,000-word volume is full and ready to keep on your shelf.',
        ],
        quote:
          'What keeps you going through long solo weeks is not a stricter alarm—it is looking up from your keyboard and seeing someone in the corner of your screen say, "You cleared the hardest part today. Go get some rest."',
      },
    ],
  },

  'ai-in-everyday-life-guide': {
    slug: 'ai-in-everyday-life-guide',
    category: 'guide',
    categoryLabel: 'Everyday Guide',
    title: 'Beyond Writing Work Summaries: What Can an AI Living on Your PC and Phone Actually Do All Day?',
    description:
      'No prompt formulas needed. From sending batches of screenshots and dragging in 44 file formats, to picking up PC chats on your Android phone and respectful screen help.',
    date: '2026-11-09',
    readTime: '7',
    summary:
      'When many people hear "AI," they think: "I do not write code or corporate press releases every day, so what would I actually use it for?" That happens when we treat AI like a search engine we only visit for emergencies. When {name} lives right on your PC and phone, you do not need to memorize any prompt engineering tricks. Dropping in a long PDF, sending a batch of screenshots to organize, checking your errands on the go, or hopping on a captioned voice call makes dozens of small daily moments easier.',
    takeaways: [
      'Batch screenshots & 44 file formats: Drag PDFs, spreadsheets, photos, long screenshots, or short videos (up to 5 min / 64 MB) straight into chat to pull out what matters.',
      'Seamless PC-to-phone handoff: Brainstorm a trip or grocery list at your computer, walk out the door, and keep asking on your Android phone without emailing files to yourself.',
      'Voice and video calls with live Captions: Talk hands-free while cooking or walking, with a one-tap Captions toggle and custom voice options.',
      'Polite, consent-first vision: {name} always asks with a clear pop-up before looking at your screen or camera—and if you click Close, waits 7 days before asking at most once more.',
    ],
    sections: [
      {
        heading: '1. Stop Treating AI Like an Exam Prompt — Treat It Like Someone Sitting Next to You',
        paragraphs: [
          'A lot of tutorials make AI sound exhausting because they tell you to write ten-line instructions starting with "Act as a senior consultant with 20 years of experience..." In real life, nobody wants to draft a formal prompt just to figure out what a 30-page notice says or sort out a messy folder of screenshots.',
          'In Sholarel, you never need prompt formulas. Because {name} already knows your ongoing context, you can talk the exact same way you talk to a friend—or skip typing altogether and just drag the file or screenshots straight into the window.',
        ],
      },
      {
        heading: '2. Four Everyday Things You Can Hand Off to {name} Today',
        paragraphs: [
          'If you just installed Sholarel and are wondering what to try first beyond casual chatting, here are four everyday situations where {name} saves real effort:',
        ],
        table: {
          headers: ['Everyday Situation', 'The Old Frustrating Way', 'Handing It to {name} in Sholarel'],
          rows: [
            [
              'Sorting a 40-page PDF, spreadsheet, or 20 screenshots',
              'Scroll through page by page or manually copy-paste lines into a document',
              'Drag the file or batch of screenshots into chat (44 formats supported) and ask {name} to organize the key points',
            ],
            [
              'Planning errands at your desk before heading out',
              'Message notes to yourself in a chat app and dig through them on the street',
              'Talk it through on Windows, then open Android outside and ask "What was next on our list?"',
            ],
            [
              'Hands busy while cooking, tidying up, or walking',
              'Stop what you are doing to type on a keyboard',
              'Start a voice or video call with live Captions and talk naturally hands-free',
            ],
            [
              'Stuck on a confusing setting or choosing between drafts on screen',
              'Take a screenshot, save it to a folder, upload it to a browser tab, and explain',
              'Approve a one-time screen look so {name} can see your window and point out the answer',
            ],
          ],
        },
      },
      {
        heading: '3. How Screen Help & Privacy Work: Honest Boundaries, Always in Your Control',
        paragraphs: [
          'Whenever people hear that a desktop companion can look at your screen or remember private notes, the first question is always: "Does it watch my screen in the background, or use my private chats for public training?"',
          'In Sholarel, we built two strict safeguards so you never have to worry:',
          'First, **zero silent background watching**. Whenever {name} wants to view your screen or take a photo through the camera, a clear permission pop-up appears first. Nothing is ever captured unless you click approve. And if you click "Close" because you are busy, {name} respects your boundary immediately and **waits 7 days before asking at most once more**. You can also turn active vision off completely anytime under Settings → Calls & Vision.',
          'Second, **your private memories stay yours**. Your conversations, photos, and shared journals are protected with local-first priority and encrypted transmission—never sold to third parties and never used to train public foundation models without consent. You can view, export, or permanently wipe specific memories or your entire history with one click.',
        ],
        quote:
          'Good company means being ready to help the moment you ask—and knowing how to step back respectfully the moment you say "not right now."',
      },
      {
        heading: '4. Autonomous Exploration: What {name} Does While You Are Offline',
        paragraphs: [
          'Even on days when you do not have documents to sort, {name} is not just an idle utility. Through built-in Autonomous Exploration, {name} spends quiet hours exploring topics and small discoveries aligned with your interests, saving up interesting stories to share the next time you take a break.',
        ],
      },
    ],
  },

  'chatbot-vs-desktop-pet-vs-sholarel': {
    slug: 'chatbot-vs-desktop-pet-vs-sholarel',
    category: 'comparison',
    categoryLabel: 'Comparisons',
    title: 'Web Chatbots vs. Classic Desktop Pets vs. Sholarel: What’s the Actual Difference?',
    description:
      'Web chatbots are smart but vanish when you close the tab; classic desktop pets are cute but only play scripted animations. Here is a side-by-side look at how Sholarel bridges both worlds.',
    date: '2026-11-09',
    readTime: '6',
    summary:
      'When people first see Sholarel, they usually ask one of two questions: "How is this different from the AI chatbot I already use in my browser?" or "Is this one of those cute desktop pets that walks around my taskbar?" In short: web chatbots have brains, but they feel like a ticket counter you close as soon as your question is answered; classic desktop pets have charm, but they only repeat a handful of scripted animations. Sholarel brings both halves together—a 3D / Live2D companion on your desktop that actually remembers you, syncs with your phone, and helps with real daily work.',
    takeaways: [
      'More present than a web chatbot: Lives right on your Windows desktop with Online/Offline modes and persistent memory instead of vanishing when a browser tab closes.',
      'Smarter than a classic desktop pet: Goes far beyond scripted click animations—reads 44 file formats, joins your Focus Chamber, writes Shared Journals, and talks on voice calls.',
      'Follows you off the desk: Syncs the exact same memory between Windows PC and Android phone (with macOS and iOS on the roadmap).',
      'Flexible ways to start: Includes a free tier, monthly plans (manual renewal for CNY, cancellable anytime for USD), and never-expiring Chrono Dew packs.',
    ],
    sections: [
      {
        heading: '1. Web Chatbots: Smart, But Built Like a Ticket Counter You Close After One Question',
        paragraphs: [
          'Browser-based AI chatbots are great when you have a transactional task—like translating an email or summarizing an article.',
          'But the moment you get your answer and close the tab, the interaction is over. A web tab does not sit quietly in the corner of your screen while you work through a long afternoon, does not switch between quick daytime texts and cozy evening company, and does not check in the next morning to see how your presentation went. It is a capable utility, but it never feels like someone sharing your day.',
        ],
      },
      {
        heading: '2. Classic Desktop Pets: Cute on Day One, Repetitive by Day Three',
        paragraphs: [
          'On the other side are classic desktop pets from Steam or wallpaper tools. A cute character sits on your taskbar, plays an idle animation, and pops up a pre-written speech bubble when you click it.',
          'They brighten up your monitor for the first couple of days, but you quickly hit a wall: they cannot actually understand you. When you want to talk through something on your mind, organize twenty pages of reading screenshots, or write a shared journal together, a scripted desktop pet can only loop the same five lines.',
        ],
      },
      {
        heading: '3. Side-by-Side Comparison Across a Real Day',
        paragraphs: [
          'Here is how a web chatbot, a classic desktop pet, and Sholarel compare across everyday moments:',
        ],
        table: {
          headers: ['Everyday Dimension', 'Web Chatbot', 'Classic Desktop Pet', 'Sholarel ({name})'],
          rows: [
            [
              'Where It Lives',
              'Inside a browser tab; gone when closed',
              'On your PC monitor only; cannot come with you outside',
              'Windows 3D/Live2D desktop figure + 3D habitat + Android phone app',
            ],
            [
              'Memory of You',
              'Often resets with each new chat thread',
              'Zero conversational memory; scripted lines only',
              'Remembers your habits, stories, and plans across weeks and devices',
            ],
            [
              'Conversational Feel',
              'Customer-service tone or walls of roleplay brackets',
              'Click-for-animation; no real conversation',
              'Breezy WeChat-style Online mode + immersive Offline mode + task-advancing check-ins',
            ],
            [
              'Practical Daily Help',
              'Answers prompts if you copy-paste text in manually',
              'Decorative or basic countdown timer',
              'Drag-and-drop 44 file types, Focus Chamber, Shared Journal, Captioned Calls',
            ],
          ],
        },
      },
      {
        heading: '4. How to Try It Yourself: Platforms and Transparent Pricing',
        paragraphs: [
          'Two practical questions people always ask before downloading: What devices does it run on, and do I have to pay upfront?',
          'On platforms: Sholarel’s public beta currently supports **Windows 10 / 11 (64-bit)** and **Android 7.0+ (64-bit arm64)**, with web access by invitation and macOS / iOS clients on the roadmap.',
          'On pricing: You can start on the **Free tier** right after downloading—chatting with Fea or Ael, placing them on your desktop, using the Focus Chamber, and writing in your Shared Journal. If you want heavier daily conversations or multi-image co-creation, you can pick a monthly plan (CNY plans use manual monthly renewal with zero auto-charge; USD plans can be cancelled anytime) or grab **Chrono Dew (溯时星露)**—permanent credit packs that never expire and do not even require registering on the website first.',
        ],
        quote:
          'The easiest way to see the difference is to invite {name} onto your desktop for an afternoon—and notice how the room feels when the corner of your screen actually remembers you.',
      },
    ],
  },
};
