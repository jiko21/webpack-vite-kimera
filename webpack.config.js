const { webpack } = require("webpack");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

const MODE = 'development'
const enableSourceMap = MODE === 'development';

module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css)/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enableSourceMap,
              importLoaders: 2
            }
          },
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.html$/,
        loader: 'string-replace-loader',
        options: {
          search: '  <script type="module" src="/src/main.jsx"></script>',
          replace: '',
        }
      }
    ]
  }
}
