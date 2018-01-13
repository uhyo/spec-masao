// template: spec
// title: masao-js
// type: library

**masao-js**はまさおのゲームデータを扱うためのライブラリです。[masao-json-format](/masao-json-format/)の読み書きやparamデータを扱うためのAPIを提供します。

## 使用方法
現在のところ、masao-jsはnpm上でCommonJS形式のモジュールとして提供されています。

```sh
npm install masao
```

ブラウザ上で動くアプリケーションに使用する場合はバンドラが必要となります。

このモジュールにはTypeScript型定義が同梱されているため、TypeScriptからの利用が可能です。

## API
```js
const masao = require('masao');
```

大別して4つのAPIがあります。

- [masao.format](./format.html): [masao-json-format](/masao-json-format/)を扱うためのAPI。
- [masao.param](./param.html): paramに関する処理のためのAPI。
- [masao.load](./load.html): 正男を表すHTMLファイルを読み込むためのAPI。
- masao.playlog: プレイログを扱うAPI。
