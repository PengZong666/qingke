const moment = require('moment');

moment.locale("zh-cn");

module.exports = {
  base: "/qingke/",
  title: "青稞",
  description: "青稞博客",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "pengbin" }],
    ["meta", { name: "keywords", content: "青稞博客，pengbin，Java" }],
  ],
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return moment(timestamp).format("LLLL")
        }
      }
    ]
  ],
  themeConfig: {
    lastUpdated: "更新时间",
    logo: "/assets/img/logo.jpg",
    sidebar: "auto",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/about/" },
      {
        text: "Languages",
        ariaLabel: "Language Menu",
        items: [
          { text: "Chinese", link: "/language/chinese/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
      { text: "External", link: "https://google.com" },
    ],
  },
};
