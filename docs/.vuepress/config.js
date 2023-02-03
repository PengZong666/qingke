const headConf = require("./config/headConf")
const pluginConf = require("./config/pluginsConf")
const nav = require("./nav.js");

module.exports = {
  title: "青稞",
  description: "青稞博客",
  head: headConf,
  plugins: pluginConf,
  themeConfig: {
    lastUpdated: "更新时间",
    logo: "/assets/img/logo.jpg",
    nav: nav,
  },
};
