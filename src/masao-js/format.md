// title: masao.format
// parent: /masao-js/
// parentname: masao-js

# masao.format

**masao.format**は[masao-json-format](/masao-json-format/)で表されたデータを扱うためのAPIです。

```js
const {
  format,
} = require('masao');
```

## format.load(obj)
**format.load**は渡されたオブジェクトを[masao-json-format](/masao-json-format/)に従って解釈するメソッドです。返り値は新しいオブジェクトです。

返り値のオブジェクトは元のオブジェクトと同じデータを表すmasao-json-formatに従ったオブジェクトです。元のオブジェクトが古いバージョンのmasao-json-formatに従っている場合でも、返り値のオブジェクトは最新のmasao-json-format (draft-4)に従ったものになります。

引数として渡されたオブジェクトがmasao-json-formatに従っていない場合はエラーとなります。

masao-json-formatに定義されていない独自のプロパティは返り値のオブジェクトにそのまま引き継がれます。

### 例
```js
// 文字列データをmasao-json-formatで読み込む例
let data = '...';

try {
  const rawObj = JSON.parse(data);
  const gameObj = format.load(rawObj);

  console.log('これは正男オブジェクトです', gameObj);
} catch(e) {
  console.error('これは正男オブジェクトではありません！', e);
}
```

## format.make(options)
`options`として渡されたフィールドの一覧からmasao-json-formatに従ったオブジェクトを生成して返します。

`options`のデータが不正な場合はエラーを発生させます。`options`には次のフィールドを渡すことができます。これらのフィールドは[masao-json-format](/masao-json-format/)のものと対応しています。

- **params**: パラメータオブジェクト。
- **version**: 正男のバージョンを表す文字列。
- **metadata**: メタデータオブジェクト。（省略可）
- **script**: JavaScript文字列。（省略可）
- **advanced-map**: 第3版マップデータオブジェクト。（省略可）
