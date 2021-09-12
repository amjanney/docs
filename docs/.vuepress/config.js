module.exports = {
  title: '朽木白空间',
  description: '',
  themeConfig: {
    sidebarDepth: 1,
    lastUpdated: '上次更新',
    repo: 'https://github.com/amjanney/docs.git',
    repoLabel: '查看源码',
    logo: '/logo.png',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '参与文档维护',
    head: [
      [
        'link',
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ],
    ],
    nav: [
      {
        text: '指南',
        link: '/guide/about-me/',
      },
      {
        text: '面经',
        link: '/interview/css/',
      },
      {
        text: '技术专题',
        link: '/subject/',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '关于博主',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/guide/about-me/',
              title: '简介',
            },
          ],
        },
        {
          title: '关于文章',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/guide/about-page/',
              title: '简介',
            },
          ],
        },
      ],
      '/interview/': [
        {
          title: 'css',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              path: '/interview/css/',
              title: '简介',
            },
          ],
        },
        {
          title: 'javascript',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            {
              path: '/interview/javascript/数据类型/',
              title: '数据类型',
            },
          ],
        },
        {
          title: 'vue',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/interview/vue/',
              title: '简介',
            },
          ],
        },
        {
          title: 'react',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/interview/react/',
              title: '简介',
            },
          ],
        },
        {
          title: 'webpack',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/interview/webpack/',
              title: '简介',
            },
          ],
        },
        {
          title: '算法',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/interview/arithmetic/',
              title: '简介',
            },
          ],
        },
        {
          title: 'http',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              path: '/interview/http/',
              title: 'HTTP2.0',
            },
          ],
        },
      ],
    },
  },
};
