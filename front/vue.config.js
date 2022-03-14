const StyleLintPlugin = require('stylelint-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const path = require('path')

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
      ],
    },
    plugins: [
      new SpriteLoaderPlugin(),
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src'),
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete('svg')
  },
}
