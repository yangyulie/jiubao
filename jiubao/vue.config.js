const path = require('path');
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
const PREV_API = '"http://localhost:36742"';
const BASE_URL = process.env.NODE_ENV === 'production'? '/' : '/'; //配置域名
// cdn预加载使用
const externals = {
  // vue: 'Vue',
  // 'vue-router': 'VueRouter',
  // vuex: 'Vuex',
  // axios: 'axios',
  // 'mint-ui': 'MINT'
  //   'js-cookie': 'Cookies',
  //   'nprogress': 'NProgress'
}

 const cdn = {
//   // 开发环境
//   dev: {
//     // css: ['https://unpkg.com/mint-ui/lib/style.css'],
//     js: []
//   },
//   // 生产环境
//   build: {
//     // css: ['https://unpkg.com/mint-ui/lib/style.css'],
//     js: [
//       'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
//       'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
//       'https://unpkg.com/vuex@3.0.1/dist/vuex.min.js',
//       'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
//       'https://unpkg.com/mint-ui/lib/index.js'
//     ]
//   }
}
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
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      args[0]['process.env'].BASE_API = PREV_API
      return args
    })

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */
    // config.plugin('html').tap(args => {
    //   if (process.env.NODE_ENV === 'production') {
    //     args[0].cdn = cdn.build
    //   }
    //   if (process.env.NODE_ENV === 'development') {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    // })

    // svg loader
    // const svgRule = config.module.rule('svg') // 找到svg-loader
    // svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    // svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    // svgRule // 添加svg新的loader处理
    //   .test(/\.svg$/)
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },

  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: config => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals
      myConfig.plugins = []
      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      // productionGzip &&
      //   myConfig.plugins.push(
      //     new CompressionWebpackPlugin({
      //       test: new RegExp(
      //         '\\.(' + productionGzipExtensions.join('|') + ')$'
      //       ),
      //       threshold: 8192, // 当文件大于8192字节时才进行压缩
      //       minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
      //     })
      //   )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    //   open: true,
    //   hot: true
    //   // https: true,
    //   // proxy: {
    //   //   '/proxy': {
    //   //     target: 'http://47.94.138.75',
    //   //     // changeOrigin: true,
    //   //     pathRewrite: {
    //   //       '^/proxy': ''
    //   //     }
    //   //   }
    //   // },
    // }
    return myConfig
  }
};
