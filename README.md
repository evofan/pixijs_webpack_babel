# Test running PixiJS under webpack + babel + base64encode environment  

<img src="https://evofan.github.io/pixijs_webpack_babel/screenshot/pic_screenshot2.jpg" width="50%">  

**DEMO**  
[https://evofan.github.io/pixijs_webpack_babel/dist/](https://evofan.github.io/pixijs_webpack_babel/dist/)  

**USAGE**  
`npm install`  
`npm run build`  
`npm run start`  
http://localhost:8080/

memo  

mode: "development" ... main.js -> 1633KB  
mode: "production" ... main.js -> 424KB  

reference  

**最新版で学ぶwebpack 4入門 JavaScriptのモジュールバンドラ**  
[https://ics.media/entry/12140/](https://ics.media/entry/12140/)  
＞webpackの導入～ビルド  

**最新版で学ぶwebpack 4入門 - Babel 7でES2019環境の構築**  
[https://ics.media/entry/16028/](https://ics.media/entry/16028/)  
＞webpack+Babel導入～jQueryをモジュールとして追加  

**最新版で学ぶwebpack 5入門 - Babel 7でES2020環境の構築**  
[https://ics.media/entry/16028/](https://ics.media/entry/16028/)  
＞ES5(IE11等)向けの指定（webpack 5以上で必要）  
＞target: ["web", "es5"]  

**最新版で学ぶwebpack 5入門 - スタイルシート(CSS/Sass)を取り込む方法**  
[https://ics.media/entry/17376/#bundle-css](https://ics.media/entry/17376/#bundle-css)  
＞CSSの読み込みに必要なローダーは、Style LoaderとCSS Loader  

**webpackインストール後のセットアップパターンまとめ。**  
[https://www.ritolab.com/entry/159#aj_4_4](https://www.ritolab.com/entry/159#aj_4_4)  
＞画像をbase64エンコードでバンドルする  

**webpackで画像を読み込む**  
[http://a0sy.hatenablog.jp/entry/2015/08/03/204933](http://a0sy.hatenablog.jp/entry/2015/08/03/204933)  
  
procedure  

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
    "start": "webpack serve",
    "watch": "webpack --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "@babel/core": "^7.14.3",
    "@babel/preset-env": "^7.14.4",
    "babel-loader": "^8.2.2",
    "elliptic": "^6.5.4",
    "file-loader": "^6.2.0",
    "lodash": "^4.17.21",
    "node-forge": "^0.10.0",
    "pixi.js": "^6.0.4",
    "ssri": "^8.0.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.1",
    "webpack-dev-server": "^3.11.2",
    "ws": "^7.4.6",
    "y18n": "^5.0.8"
  },
}
------------------------------------------------------------------

webpack.config.js
------------------------------------------------------------------
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  // mode: "production",
  mode: "development",

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
      // 画像をBase64エンコード
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader"
      }
    ],
  },
 // ES5(IE11等)向けの指定
  target: ["web", "es5"],
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

**browserslist / browserslist**  
[https://github.com/browserslist/browserslist#browsers-data-updating](https://github.com/browserslist/browserslist#browsers-data-updating)  

Browserslist: caniuse-lite is outdated. Please run:  
npx browserslist@latest --update-db  
```
------------------------------------------------------------------
Why you should do it regularly:
https://github.com/browserslist/browserslist#browsers-data-updating
Latest version:     1.0.30001231
Installed version:  1.0.30001228
Removing old caniuse-lite from lock file
Installing new caniuse-lite version
$ npm install caniuse-lite
Cleaning package.json dependencies from caniuse-lite
$ npm uninstall caniuse-lite
caniuse-lite has been successfully updated

Target browser changes:
- and_chr 85
+ and_chr 90
- and_ff 79
+ and_ff 87
- android 81
+ android 90
- chrome 85
- chrome 84
- chrome 83
+ chrome 90
+ chrome 89
+ chrome 88
- edge 85
- edge 84
+ edge 90
+ edge 89
- firefox 80
- firefox 79
+ firefox 88
+ firefox 87
- ios_saf 14.0
- ios_saf 13.3
- ios_saf 13.0-13.1
- ios_saf 12.2-12.4
- ios_saf 12.0-12.1
+ ios_saf 14.5
+ ios_saf 14.0-14.4
- node 14.9.0
- node 12.18.0
+ node 16.1.0
+ node 15.14.0
+ node 14.17.0
+ node 12.22.0
- op_mob 59
+ op_mob 62
- opera 70
- opera 69
+ opera 75
+ opera 74
- safari 13.1
+ safari 14.1
- samsung 12.0
- samsung 11.1-11.2
+ samsung 14.0
+ samsung 13.0
------------------------------------------------------------------
```

ビルド時の警告を消す  

**webpack5 をほぼチュートリアル通りに進める その1（jsファイルのみのビルド）Psychedelic Engineer Note**  
[http://psychedelicnekopunch.com/archives/2057](http://psychedelicnekopunch.com/archives/2057)  

**Webpack2のパフォーマンス警告を制御する - Qiita**  
[https://qiita.com/terrierscript/items/f840b5ccff0c0be7420a](https://qiita.com/terrierscript/items/f840b5ccff0c0be7420a)  
>performance: { hints: false }  

**[webpack] WARNING in asset size limit、と出たときの対処法**  
[https://zenn.dev/arisa_dev/articles/webpack-warning-code-splitting](https://zenn.dev/arisa_dev/articles/webpack-warning-code-splitting)  

**webpackのパフォーマンスヒントが厳しい - とろろこんぶろぐ**  
[https://oisham.hatenablog.com/entry/2019/04/08/094108](https://oisham.hatenablog.com/entry/2019/04/08/094108)  

```
------------------------------------------------------------------
WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets:
  main.js (412 KiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (412 KiB)
      main.js


WARNING in webpack performance recommendations:
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
------------------------------------------------------------------
```  

**To v4 from v3 | webpack**  
[https://webpack.js.org/migrate/4/](https://webpack.js.org/migrate/4/)  
webpack-dev-server3.11.2から4にアップデートするとエラー出るので修正する  

**npmてインストールされているハッケーシを、npm-check-updatesでまとめてアッフテートする方法**  
[https://www.nxworld.net/npm-check-updates.html](https://www.nxworld.net/npm-check-updates.html)  
>特定のパッケージを除外  
`ncu -x xxx`  
