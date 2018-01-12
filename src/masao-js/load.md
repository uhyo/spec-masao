// title: masao.load

# masao.load

**masao.load**は正男を表すHTMLファイルを読み込むためのAPIです。

このAPIはDOM等の使用を要求するため、ブラウザアプリ専用です。

```js
const {
  load,
} = require('masao');
```

## load.html(source)
**load.source**は与えられたHTML文書から正男を検出します。返り値はPromiseであり、その結果は[masao-json-format](/masao-json-format/)で表された正男データです。もし文書中から正男が見つからなかった場合はnullとなります。

このメソッドは、Java版時代のapplet要素・object要素で表された正男に加え、canvas正男のAPIを用いて設置された正男も出来る限り検出しようとします。その目的のため、このメソッドは与えられたHTML文書内にあるJavaScriptを実行します。

セキュリティに最大限配慮して、これはサンドボックス化されたiframeの中から読みこまれたWebWorkerの中で行われます。それでも万全を期すために、信頼できないHTML文書を読み込むことは推奨されません。読み込む文書はユーザーが自らの用意した文書のみとし、その文書を信頼するかどうかはユーザーの責任とすべきです。
