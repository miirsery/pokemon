const StyleLintPlugin = require('stylelint-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URI,
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /\.scss$/,
          use: [
            'sass-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  './src/styles/variables.scss',
                  './src/styles/mixins.scss',
                ],
              },
            },
          ],
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
