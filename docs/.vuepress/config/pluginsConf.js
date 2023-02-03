const moment = require('moment');
const secret = require("./secret");

moment.locale("zh-cn");

module.exports = {
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',
      autoCreateIssue: true,

      // 其他的 Vssue 配置
      owner: 'PengZong666',
      repo: 'qingke',
      clientId: secret.clientId,
      clientSecret: secret.clientSecret
    },
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        return moment(timestamp).format("LLLL")
      }
    },
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新"
      }
    },
    '@vuepress/back-to-top': true,
    '@vuepress/medium-zoom': {
      selector: 'img',
    },
    "vuepress-plugin-auto-sidebar": {
      nav: true
    }
}