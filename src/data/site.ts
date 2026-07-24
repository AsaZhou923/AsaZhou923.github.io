export const site = {
  name: "Asa Zhou",
  shortName: "AZ",
  title: "Asa Zhou — Product Engineer & Independent Builder",
  url: "https://asazhou923.github.io",
  description:
    "Asa Zhou 的个人技术作品集与数字花园。记录本地 AI、隐私优先数据系统、摄影智能与独立产品的设计和实现。",
  language: "zh-CN",
  nav: [
    { label: "项目", href: "/#work" },
    { label: "写作", href: "/writing/" },
    { label: "关于", href: "/about/" }
  ],
  social: [
    {
      label: "GitHub",
      href: "https://github.com/AsaZhou923"
    },
    {
      label: "RSS",
      href: "/rss.xml"
    }
  ],
  projects: [
    {
      index: "01",
      name: "MeetingRelay",
      eyebrow: "Local-first meeting intelligence",
      description: "在 Windows 本机采集系统声与麦克风，把真实会议转成可保存、可翻译、可导出的长期记忆。",
      status: "v0.0.1 / Released",
      tags: ["Rust", "Tauri", "SenseVoice", "SQLite"],
      evidence: ["01:01:04 真机会议", "25 / 25 final 持久化", "中 · 日 · 英 ASR"],
      href: "https://github.com/AsaZhou923/MeetingRelay/releases/tag/v0.0.1",
      action: "查看公开版本",
      tone: "acid",
      visual: "relay",
      featured: true
    },
    {
      index: "02",
      name: "PicSpeak",
      eyebrow: "AI photography critique",
      description: "从一次照片点评，延伸到复拍对比、成长轨迹与视觉参考，让摄影反馈真正进入下一次快门。",
      status: "Web + iOS / Active",
      tags: ["Next.js", "FastAPI", "Vision LLM", "PostgreSQL"],
      evidence: ["270 项自动化测试", "五维摄影点评", "GPT-5.6 Retake Coach"],
      href: "https://www.picspeak.art",
      action: "体验 PicSpeak",
      tone: "gold",
      visual: "picspeak",
      image: "/assets/projects/picspeak-review.webp",
      featured: true
    },
    {
      index: "03",
      name: "TokSync",
      eyebrow: "Private AI coding telemetry",
      description: "跨设备汇总 AI 编程工具的 token、成本与来源健康度；默认只同步指标，不上传对话正文。",
      status: "v0.6 / Active",
      tags: ["TypeScript", "Hono", "Next.js", "Drizzle"],
      evidence: ["136 项测试", "10k events / 174ms", "Metrics-only by default"],
      href: "https://github.com/AsaZhou923/toksync",
      action: "查看源代码",
      tone: "mint",
      visual: "toksync",
      image: "/assets/projects/toksync-dashboard.webp",
      featured: true
    },
    {
      index: "04",
      name: "OfferWave",
      eyebrow: "Job-search service infrastructure",
      description: "覆盖用户认证、职位管理、求职进度、会员权益、后台运营与爬虫接入的求职平台后端。",
      status: "API v1.1.2 / Active",
      tags: ["Java 17", "Spring Boot", "MySQL", "Redis"],
      evidence: ["多角色权限模型", "职位审核与同步", "OpenAPI 契约"],
      href: "https://github.com/AsaZhou923/OfferWave",
      action: "查看后端仓库",
      tone: "ember",
      visual: "offerwave",
      featured: false
    },
    {
      index: "05",
      name: "PromptCrate",
      eyebrow: "Local prompt utility",
      description: "在任意网页输入框里唤出私有模板、填写变量并插入光标；低权限、无账号、所有内容留在本地。",
      status: "System designed / Pre-build",
      tags: ["Manifest V3", "TypeScript", "Local Storage", "Privacy"],
      evidence: ["快捷键即时唤出", "变量模板", "零云端依赖"],
      href: null,
      action: "产品规格已完成",
      tone: "ice",
      visual: "promptcrate",
      featured: false
    }
  ],
  principles: [
    {
      index: "A",
      title: "用证据替代形容词",
      copy: "Release、回归测试、性能数据和真实使用链路，比“已经完成”更诚实。每个作品都保留可验证的边界。"
    },
    {
      index: "B",
      title: "隐私先成为架构",
      copy: "本地优先、最小数据面和显式授权不是发布后的补丁，而是 MeetingRelay、TokSync 与 PromptCrate 的起点。"
    },
    {
      index: "C",
      title: "让产品拥有触感",
      copy: "工程负责可靠，视觉负责被理解。两者在同一套系统里相互校准，让复杂能力仍然自然、清晰、好用。"
    }
  ]
} as const;
