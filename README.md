# webpack+babel������PixiJS�����s����e�X�g
�Q�ƌ��͉��L

**�ŐV�łŊw��webpack 4���� JavaScript�̃��W���[���o���h��**  
[https://ics.media/entry/12140/](https://ics.media/entry/12140/)  
��webpack�̓����`�r���h  

**�ŐV�łŊw��webpack 4���� - Babel 7��ES2019���̍\�z�iReact, Vue, Three.js, jQuery�̃T���v���t���j**  
[https://ics.media/entry/16028/](https://ics.media/entry/16028/)  
��webpack+Babel�����`jQuery�����W���[���Ƃ��Ēǉ�  

**webpack�C���X�g�[����̃Z�b�g�A�b�v�p�^�[���܂Ƃ߁BBabel/ESLint/SASS�Ȃǂ�p���ăt�����g�G���h�J�����𐮂���**  
[https://www.ritolab.com/entry/159#aj_4_4](https://www.ritolab.com/entry/159#aj_4_4)  
���摜��base64�G���R�[�h�Ńo���h������  

**webpack�ŉ摜��ǂݍ���**  
[http://a0sy.hatenablog.jp/entry/2015/08/03/204933](http://a0sy.hatenablog.jp/entry/2015/08/03/204933)  

**DEMO**  
[https://evofan.github.io/pixijs_sequence_anime_test/](https://evofan.github.io/pixijs_sequence_anime_test/)

**�菇**  

�v���W�F�N�g�p�f�B���N�g�����쐬

npm init -y

npm i -D webpack webpack-cli

npm i -D babel-loader @babel/core @babel/preset-env

npm i pixi.js // ���W���[���Ƃ��ēǂݍ��݂����̂ŁA-D�͎g��Ȃ�

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
    "pixi.js": "^5.0.4" // PixiJS�͂�����ɓo�^
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
  // ���[�h�l�� production �ɐݒ肷��ƍœK�����ꂽ��ԂŁA
  // development �ɐݒ肷��ƃ\�[�X�}�b�v�L����JS�t�@�C�����o�͂����
  mode: "production",
  // mode: "development",

  // ���[�J���J���p���𗧂��グ��
  // ���s���Ƀu���E�U�������I�� localhost ���J��
  devServer: {
    contentBase: "dist",
    open: true
  },

  // ���C���ƂȂ�JavaScript�t�@�C���i�G���g���[�|�C���g�j
  entry: "./src/index.js",

  // �t�@�C���̏o�͐ݒ�
  output: {
    //  �o�̓t�@�C���̃f�B���N�g����
    path: `${__dirname}/dist`,
    // �o�̓t�@�C����
    filename: "main.js"
  },

  module: {
    rules: [
      {
        // �g���q .js �̏ꍇ
        test: /\.js$/,
        use: [
          {
            // Babel �𗘗p����
            loader: "babel-loader",
            // Babel �̃I�v�V�������w�肷��
            options: {
              presets: [
                // �v���Z�b�g���w�肷�邱�ƂŁAES2019 �� ES5 �ɕϊ�
                "@babel/preset-env"
              ]
            }
          }
        ]
      },
      // �摜��Base64�G���R�[�h
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader"
      }
    ]
  }
};
------------------------------------------------------------------

// �r���h
npm run build
��mode��webpack.config.js����mode�Ŏw��idevelopment��production�j
�i����npx webpack�j

// ���[�J���T�[�o�[������
npm i -D webpack-dev-server

package.json
------------------------------------------------------------------
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server" // ���ǉ�
  },
------------------------------------------------------------------

webpack.config.js
------------------------------------------------------------------
  // ���[�J���J���p���𗧂��グ��
  // ���s���Ƀu���E�U�������I�� localhost ���J��
  devServer: {
    contentBase: "dist", // ���ǉ�
    open: true
  }
------------------------------------------------------------------

// �u���E�U���N�������[�J���ihttp://localhost:8080/�j�Ŏ��s
npm run start
�i����npx webpack-dev-server�j

// �u���E�U���N���������[�J���ō����r���h�ibuild��葬���j
npm run watch
�i����npx webpack --watch�j

package.json�t�@�C��
-----------------------------------------------
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch" // ���ǉ�
  },
-----------------------------------------------

// �摜���o���h�����邽�߂ɒǉ�
npm i -D file-loader url-loader
