const path = require("path");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";
const isLib = process.env.LIB === "1";
let output = {
  path: path.resolve(__dirname, "../dist/main"),
  filename: function(file) {
    if (file.chunk.name === "index") return "index.js";
    return "[name].js";
  },
  chunkFilename: "[id].js",
  libraryTarget: "commonjs2"
};
let entry = {
  "base-bar": "./packages/base-bar/index.js",
  "base-line": "./packages/base-line/index.js",
  "list-bar": "./packages/list-bar/index.js",
  "marked-line": "./packages/marked-line/index.js",
  "multilevel-pie": "./packages/multilevel-pie/index.js",
  "select-line": "./packages/select-line/index.js",
  "world-map": "./packages/world-map/index.js"
};
if (isLib) {
  output = {
    path: path.resolve(__dirname, "../dist/lib"),
    filename: "lib.js",
    library: "echarts-custom",
    libraryTarget: "umd"
  };
  entry = {
    index: "./packages/index.js"
  };
}

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: entry,
  output: output,
  resolve: {
    extensions: [".js", ".vue", ".json"],
    modules: ["node_modules"]
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: "/(node_modules)/",
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isLib ? "[name].css" : "theme-package/[name].css"
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {}
};

if (!isLib) {
  webpackConfig.plugins.push(
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "../packages/index.js")
      }
    ])
  );
}

if (isProd) {
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "echarts-custom",
        chunks: "all"
      }
    }
  };
  webpackConfig.plugins.push(new UglifyJsPlugin());
  webpackConfig.externals = {
    vue: "vue",
    echarts: "echarts"
  };
}
if (process.env.ANALYSIS === "1") {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
