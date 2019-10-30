const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WorkerPlugin = require("worker-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode: "production",
  entry: {
    index: "./ts/main.ts"
  },
  output: {
    path: dist,
    filename: "[name].js",
    globalObject: "globalThis"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: dist
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CopyPlugin([path.resolve(__dirname, "static")]),

    new WasmPackPlugin({
      crateDirectory: __dirname,
      extraArgs: "--out-name index"
    }),
    new WorkerPlugin({
      plugins: [
        new WasmPackPlugin({
          crateDirectory: __dirname,
          extraArgs: "--out-name index"
        })
      ]
    })
  ]
};
