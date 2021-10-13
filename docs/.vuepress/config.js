module.exports = {
  title: '朽木白知识天地',
  base: '/',
  description:
    '朽木白的学习基地是朽木白的个人博客，用于记录学习笔记、分享音乐、书籍、旅行等个人兴趣的站点。',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    logo: '/logo.png',
    docsDir: 'docs',
    sidebarDepth: 3,
    displayAllHeaders: false,
    smoothScroll: true,
    nav: [
      {
        text: '面经宝典',
        link: '/interview/',
      },
      {
        text: '关于',
        icon: 'reco-message',
        items: [
          { text: '关于我', link: '/about/', icon: 'reco-account' },
          {
            text: 'GitHub',
            link: 'https://github.com/amjanney',
            icon: 'reco-github',
          },
          {
            text: '掘金',
            link: 'https://juejin.cn/user/430664288573789',
            icon: 'reco-github',
          },
        ],
      },
    ],
    sidebar: {
      '/interview/': [
        '',
        '程序员面试软技能',
        'offer收割机之HTML篇',
        'offer收割机之HTML篇2',
        'offer收割机之CSS篇',
        'offer收割机之JavaScript篇',
        'offer收割机之手写代码篇',
        'offer收割机之代码输出篇',
        'offer收割机之Vue篇',
        'offer收割之vue项目的性能优化',
        'offer收割机之性能优化篇',
        'offer收割机之前端工程化篇',
        'offer收割机之浏览器原理篇',
        'offer收割机之计算机网络篇',
        'offer收割之算法篇',
      ],
      '/about/': [''],
    },
  },
};
