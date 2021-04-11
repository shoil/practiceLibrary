const frontend = require('./frontend');
const backend = require('./backend');

module.exports = {
  base: '/',
  title: 'yc的个人博客',
  description: '个人博客',
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': './src'
      }
    }
  },
  themeConfig: {
    // logo: '/assets/img/logo.png',
    smoothScroll: true, //平滑滚动
    sidebarDepth: 3,
    lastUpdated: '最后更新时间',
    backToTop: true,
    nav: [
      { text: '首页', link: '/' },
      { text: 'github', link: 'https://github.com/shoil/' },
      {
        text: '技术文档',
        // ariaLabel: 'Language Menu',
        items: [
          { text: '前端', items: frontend.nav },
          { text: '后端', items: backend.nav }
        ]
      },

    ], // 菜单栏
    sidebar: {
      ...frontend.side,
      ...backend.side,
    }, // 侧边栏
    displayAllHeaders: false // 显示所有页面的标题链接 默认值：false
  },
  plugins: [
    //美化相关：
    // ["cursor-effects"], //鼠标点击特效
    ["vuepress-plugin-reading-progress"], //顶部进度条
    [
      "vuepress-plugin-code-copy",
      {
        color: "#6D7EAD",
        successText: "🌈复制成功！🌈",
      },
    ],
    "@vuepress/last-updated"
  ],
  markdown: {
    // ......
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  }
}