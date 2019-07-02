# webpack+babel環境下でPixiJSを実行するテスト
参照元は下記

**最新版で学ぶwebpack 4入門 JavaScriptのモジュールバンドラ**  
[https://ics.media/entry/12140/](https://ics.media/entry/12140/)  
＞webpackの導入～ビルド  

**最新版で学ぶwebpack 4入門 - Babel 7でES2019環境の構築**  
[https://ics.media/entry/16028/](https://ics.media/entry/16028/)  
＞webpack+Babel導入～jQueryをモジュールとして追加  

**webpackインストール後のセットアップパターンまとめ。**  
[https://www.ritolab.com/entry/159#aj_4_4](https://www.ritolab.com/entry/159#aj_4_4)  
＞画像をbase64エンコードでバンドルする  

**webpackで画像を読み込む**  
[http://a0sy.hatenablog.jp/entry/2015/08/03/204933](http://a0sy.hatenablog.jp/entry/2015/08/03/204933)  

**DEMO**  
[https://evofan.github.io/pixijs_webpack_babel/](https://evofan.github.io/pixijs_webpack_babel/)  
  
  **手順**  

プロジェクト用ディレクトリを作成

npm init -y

npm i -D webpack webpack-cli

npm i -D babel-loader @babel/core @babel/preset-env

npm i pixi.js // モジュールとして読み込みたいので、-Dは使わない

```
package.json
------------------------------------------------------------------
{
  "name": "test_webpack_babel_pixijs",
  "version": "1.0.0",
  "main": "webpack.config.js",
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server",
    "watch": "webpack --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "pixi.js": "^5.0.4" // PixiJSはこちらに登録
  },
  "devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "file-loader": "^4.0.0",
    "url-loader": "^2.0.1",
    "webpack": "^4.35.2",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2"
  }
}
------------------------------------------------------------------

webpack.config.js
------------------------------------------------------------------
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

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
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
      // 画像をBase64エンコード
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader"
      }
    ]
  }
};
------------------------------------------------------------------
```

ビルド  
npm run build  
※modeはwebpack.config.js内のmodeで指定（developmentかproduction）  
（又はnpx webpack）  

ローカルサーバーを入れる  
npm i -D webpack-dev-server

```
package.json
------------------------------------------------------------------
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server" // ←追加
  },
------------------------------------------------------------------

webpack.config.js
------------------------------------------------------------------
  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "dist", // ←追加
    open: true
  }
------------------------------------------------------------------
```

ブラウザを起動しローカルで実行（http://localhost:8080/)  
npm run start  
（又はnpx webpack-dev-server）  

ブラウザを起動せずローカルで差分ビルド（buildより速い）  
npm run watch  
（又はnpx webpack --watch）  

```
package.jsonファイル
-----------------------------------------------
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch" // ←追加
  },
-----------------------------------------------
```

画像をバンドルするために追加  
npm i -D file-loader url-loader
