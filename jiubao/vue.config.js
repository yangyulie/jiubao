const path = require('path');
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
const BASE_URL = process.env.NODE_ENV === 'production'? '/' : '/'; //配置域名
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@api', resolve('src/api'))
    .set('@assets', resolve('src/assets'))
    .set('@components', resolve('src/components'))
    .set('@views', resolve('src/views'))
  },
  // devServer: {//配置跨域
  //   proxy: {
  //     // '/': {
  //     //   ws: false,
  //     //   target: 'http://wx.13jss.com/smartp/web'
  //     // }
  //   }
  // }
};
