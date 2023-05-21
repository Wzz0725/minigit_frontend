module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["prismjs", {
      "languages": ["javascript", "css", "markup","c","cpp","java"],
      "plugins": ["line-numbers"], //配置显示行号插件
      "theme": "solarizedlight", //主体名称
      "css": true
    }]
  ]
}
