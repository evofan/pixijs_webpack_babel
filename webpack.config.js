// const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  // mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dist",
    open: true
  },

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.js",

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Pixi.js Demo", // If there is template.html, that title takes precedence
      template: "./src/index.html"
    })
  ],

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // path: path.resolve(__dirname, `${__dirname}/dist`),
    // 出力ファイル名
    filename: "main.js",
  },

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2019 を ES5 に変換
                "@babel/preset-env"
              ]
            }
          }
        ]
      },
      // css
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      },
      // 画像をBase64エンコード
      {
        test: /\.(jpg|png|gif)$/,
        // loader: "url-loader"
        type: "asset/inline",
      }
    ]
  },
  // performance: { hints: false }
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },

  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
