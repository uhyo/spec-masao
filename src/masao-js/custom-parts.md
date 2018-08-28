// title: masao.customParts
// parent: /masao-js/
// parentname: masao-js

# masao.customParts

**masao.customParts**はカスタムパーツに関連する情報を扱うためのAPIです。

```js
const {
  customParts,
} = require('masao');
```

## customParts.customPartsProperties
各パーツに指定可能なプロパティの情報を持ったオブジェクトです。構造は以下のようになっています。

```js
customPartsProperties = {
  5100: {
    walk_speed: {
      type: 'integer',
      unit: 'px/f',
      description: '歩く速度',
      default: 3,
    },
  },
  /* ... */
};
```

