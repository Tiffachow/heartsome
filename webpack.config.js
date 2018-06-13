var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = [
  {
    entry: "./src/app/app.ts",
    output: {
      path: path.join(__dirname, "public", "scripts"),
      // filename: "build.js"
      filename: 'build.[chunkhash].js',
      chunkFilename: 'build.[chunkhash].js'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
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
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'common-build',
          filename: 'common-build.min.js',
          minChunks: Infinity
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourceMap: false
      }),
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: "chunk-manifest-build.json",
        manifestVariable: "webpackManifestBuild"
      })
    ]
  }
]
