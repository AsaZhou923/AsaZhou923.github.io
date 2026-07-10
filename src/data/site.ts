export const site = {
  name: "Asa Zhou",
  shortName: "AZ",
  title: "Asa Zhou — Developer, Writer & Digital Gardener",
  url: "https://asazhou923.github.io",
  description:
    "Asa Zhou 的个人博客与数字花园。记录前端开发、产品思考、独立创作，以及把想法做成现实的过程。",
  language: "zh-CN",
  nav: [
    { label: "首页", href: "/" },
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
      name: "Signal Garden",
      eyebrow: "Living publication",
      description: "一个让文章、项目和正在生长的想法互相连接的个人知识现场。",
      status: "持续生长",
      tags: ["Astro", "Writing", "Design Systems"],
      href: "/writing/",
      tone: "lime"
    },
    {
      index: "02",
      name: "Tiny Tools",
      eyebrow: "Useful experiments",
      description: "把重复工作压缩成一个按钮的小型工具实验；少一点摩擦，多一点创造。",
      status: "实验中",
      tags: ["Frontend", "Automation", "UX"],
      href: "https://github.com/AsaZhou923",
      tone: "orange"
    },
    {
      index: "03",
      name: "Build in Public",
      eyebrow: "Open process",
      description: "公开保存决策、失败与修正，让作品背后的过程也能成为可复用的经验。",
      status: "实时记录",
      tags: ["Making", "Notes", "Reflection"],
      href: "/writing/",
      tone: "blue"
    }
  ],
  principles: [
    {
      index: "A",
      title: "让复杂留在幕后",
      copy: "界面可以有戏剧性，但使用路径必须直接。特效服务叙事，内容永远拥有最高优先级。"
    },
    {
      index: "B",
      title: "把过程写进作品",
      copy: "成品只说明结果，过程才暴露判断。记录取舍，是为了让下一次创造更快、更清醒。"
    },
    {
      index: "C",
      title: "长期主义，也要好玩",
      copy: "能持续维护的系统才会积累价值；能持续带来惊喜的系统，才让人愿意回来。"
    }
  ]
} as const;
