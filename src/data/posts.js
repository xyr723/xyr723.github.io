const posts = [
  {
    slug: 'city-lights-writing-flow',
    title: '把城市的碎光折进博客：关于写作节奏的 4 个瞬间',
    summary:
      '记录一次凌晨写作 session，从想法捕捉、材料拆分到结构回填的全过程，顺便聊聊如何在忙碌里留出写字的仪式感。',
    tags: ['写作手记', '创作日常'],
    date: '2024.10',
    heroNote: '夜里 01:12 · 第 3 杯气泡水 · 正好写到第二节',
    sections: [
      {
        heading: '灵感捕捉：碎光不一定要马上记下来',
        body: [
          '把灵感攒成清单之前，我先用语音 memo 把闪念捕捉下来，隔天再统一整理。这样不会打断正在进行的任务，也还能保留情绪感。',
          '真正动笔前，我会挑 3 个关键词写在便签上，让耳朵里随机播放 Lo-Fi，提醒自己“只是测试段落”而不是“要写出完美章回”。',
        ],
      },
      {
        heading: '结构回填：用色块标记写作能量',
        body: [
          '我把整篇文章拆成 4 段色块：粉色代表情绪、橙色代表细节、蓝色代表事实、白色代表留白。',
          '先放上粉色和白色，保证文章有呼吸，再慢慢加细节和事实。这个顺序能避免一开始就被信息量压住。',
        ],
      },
    ],
    externalLink: 'https://your-blog-link.com/posts/writing-flow',
  },
  {
    slug: 'react-19-cute-updates',
    title: 'React 19 的那些可爱更新，让博客交互又轻盈了一点',
    summary:
      '尝试把新的 action API、自动批处理和并发功能引入到个人博客中，一边调色一边记录下踩过的坑。',
    tags: ['前端体验', 'React 19'],
    date: '2024.09',
    heroNote: '周六午后 · 咖啡续杯两次 · 修复了导航闪烁',
    sections: [
      {
        heading: 'Action API：写作表单终于不再手忙脚乱',
        body: [
          '我把投稿表单改成了 action + optimistic UI，提交时可以立即看到“草稿已收到”的反馈，失败也能快速回滚提示。',
          '配合 Suspense，表单的 loading 状态很自然融入了页面，不需要一堆条件渲染。',
        ],
      },
      {
        heading: '并发特性：导航切换像翻相册',
        body: [
          'React 19 的并发更新让博客的导航切换不再闪烁，我还顺便加了一个渐变过渡，配合骨架屏体验更顺滑。',
          '自动批处理让我在多处 setState 时候不用刻意收敛，组件依然只渲染一次，写作时的心流也不被打断。',
        ],
      },
    ],
    externalLink: 'https://your-blog-link.com/posts/react-19-notes',
  },
];

export default posts;

