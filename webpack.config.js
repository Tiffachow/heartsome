var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    entry: "./src/app/app.ts",
    output: {
      path: path.join(__dirname, "public", "scripts"),
      filename: 'bundle.[hash].js',
      chunkFilename: 'bundle.[hash].js'
    },
    mode: process.env.ENV,
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader" },
        { test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
          ],
        },
        { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.(woff|woff2)$|\.ttf$|\.wav$|\.mp3$|\.eot$/,
          use: [
            { loader: "url-loader" },
            { loader: "file-loader" },
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      minimize: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: './../views/index.ejs',
        // Load a custom template (lodash by default see the FAQ for details)
        template: "./src/views/index-template.html"
      })
    ]
  }
]
