var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = [
  {
    entry: "./src/clip/app-prod.ts",
    output: {
      path: path.join(__dirname, "js", "build"),
      // filename: "clip-bundle.js"
      filename: 'clip-bundle.[chunkhash].js',
      chunkFilename: 'clip-bundle.[chunkhash].js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
        { test: /\.css$/, loader: "style!css" },
        { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.eot$/, loader: "url-loader" }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'common-clip',
          filename: 'common-clip.min.js',
          minChunks: Infinity
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourceMap: false
      }),
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: "chunk-manifest-clip.json",
        manifestVariable: "webpackManifestClip"
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  },
  {
    entry: "./src/prime/app-prod.ts",
    output: {
      path: path.join(__dirname, "js", "build"),
      // filename: "prime-bundle.js"
      filename: 'prime-bundle.[chunkhash].js',
      chunkFilename: 'prime-bundle.[chunkhash].js'
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" },
        { test: /\.css$/, loader: "style!css" },
        { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/, loader: "url-loader" },
        // { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'
        }, {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'
        }, {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
        }, {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common-prime',
        filename: 'common-prime.min.js',
        minChunks: Infinity
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourceMap: false
      }),
      new ManifestPlugin(),
      new ChunkManifestPlugin({
        filename: "chunk-manifest-prime.json",
        manifestVariable: "webpackManifestPrime"
      }),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  }
]
