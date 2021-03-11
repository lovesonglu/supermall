module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿的高度（可以不配置）
      unitPrecision: 5,//小数点后几位
      viewportUnit: 'vw',//转成的单位
      selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//不需要转换的类
      minPixelValue: 1,//小于或等于1px的不转换成视窗单位
      mediaQuery: false,//是否允许在媒体查询中转换px
      exclude: [/TabBar/]//不需要转换的文件
    }
  }
}
