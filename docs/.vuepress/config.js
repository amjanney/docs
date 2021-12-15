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
        '01-skill',
        '02-html',
        '04-css',
        '04-css2',
        '04-css3',
        '04-css4',
        '05-javascript',
        '06-output',
        '07-coding',
        '08-vue',
        '09-vue',
        '10-perfomance',
        '11-webpack',
        '12-browser',
        '14-algorithm',
      ],
      '/about/': [''],
    },
  },
};
