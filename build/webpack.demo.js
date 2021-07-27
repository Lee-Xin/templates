const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    docs: "./example/entry.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist/demo")
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    modules: ["node_modules"]
  },
  devServer: {},
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
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, "./md-loader/index.js")
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./example/index.html",
      filename: "./index.html",
      name: ""
    }),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ],
  optimization: {
    minimizer: []
  },
  devtool: "#eval-source-map"
};

if (isProd) {
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[hash:7].css"
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: "echarts-package",
        chunks: "all"
      }
    }
  };
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
