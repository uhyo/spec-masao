// title: masao.param
// parent: /masao-js/
// parentname: masao-js

# masao.param

**masao.param**はcanvasまさおのparam値に関する処理を提供するAPIです。

```js
const {
  param,
} = require('masao');
```

一部のメソッドは**paramオブジェクト**を扱います。これは、各paramの値をkey-valueペアとして表したオブジェクトのことです。
```js
// paramオブジェクトの例
{
  "map0-0": "...(中略)...",
  "map0-1": "...(中略)...",
  // (中略)
  "time_max": 0,
}
```

一部のメソッドは**正男のバージョンを表す文字列**を引数にとります。これは[masao-json-format](/masao-json-format/)のversionフィールドに入る文字列と同じです。例えば`"2.8"`や`"fx16"`などを指定できます。

## param.getDefaultValue(key)
**param.getDefaultValue**は渡されたparam名に対するデフォルトの値を返します。存在しないparam名を渡された場合はnullを返し、それ以外の場合は文字列を返します。

### 例
```js
const time_max = param.getDefaultKey('time_max');

console.log(time_max); // "300"
```

## param.cutDefaults(params)
**param.cutDefaults**は渡されたparamオブジェクトからデフォルト値を取り除いてできた新しいparamオブジェクトを返します。

返り値のparamオブジェクトはデフォルト値とは異なる値を持つparam値だけが残ったものになるため、データ量を小さくすることができます。

なお、paramオブジェクトに存在しないparam名がある場合、それは取り除かれます。

### 例
```js
const params = {
  "time_max": "300",
};

const params2 = param.cutDefaults(params);

console.log(params2); // {}
```

## param.cutUnadvancedData(params)
**param.cutUnadvancedData**は渡されたparamオブジェクトから、第3版マップデータ使用時には不要なparamを取り除いてできた新しいparamオブジェクトを返します。

第3版マップデータ使用時には不要なparamとは、`"map0-0"`および`"layer0-0"`のようなparamのことです。

## param.addDefaults(params, [options])
**param.addDefaults**は、渡されたparamオブジェクトに不足しているparam値を足した新しいparamオブジェクトを返します。新しく足されたparamはデフォルト値を持ちます。

これはcutDefaultsの逆のことをするメソッドです。デフォルト値が省略されたデータを、全てのparamを含むデータに戻すことができます。

第2引数はオプションオブジェクトで、次のフィールドを持つことができます。

- **version**: 正男のバージョンを表す文字列。指定した場合、そのバージョンに存在するparamのみが追加されます。デフォルトは`"kani2"`です。
- **nomaps**: 真偽値。trueの場合、マップに関するparamは追加されません。デフォルトはfalseです。
- **noresources**: 真偽値。trueの場合、ファイル名に関するparamは追加されません。デフォルトはfalseです。

## param.sanitize(params, [version])
**param.sanitize**は、渡されたparamオブジェクトから余計なフィールドを取り除いた新しいparamオブジェクトを返します。

余計なフィールドとは、存在しないparam名のフィールドです。

第2引数は正男のバージョンを表す文字列で、これを指定した場合はそのバージョンに存在しないparam名についても取り除かれます。

## param.minimizeMapData(params)
**param.minimizeMapData**は、渡されたparamオブジェクトに含まれるマップデータ（`map0-0`などのparam）を最小化した新しいparamオブジェクトを返します。

このメソッドにより、`.`だけの行などが省略されます。

## param.validateParams(params, options)
**param.validateParams**は、渡されたparamオブジェクトが正しいparamオブジェクトかどうか判定します。正しいオブジェクトの場合はtrueを、そうでない場合はfalseを返します。

optionsオブジェクトは次のフィールドを持つことができます。

- **version**: 正男のバージョンを表す文字列。デフォルトは`"kani2"`。
- **maxLength**: 各param値の長さの上限を表す数値。デフォルトは上限無し。
- **allowExtraneous**: 余計なフィールドを許すかどうかを表す真偽値。デフォルトはtrue。
- **allowNulls**: 余計なフィールドがnullを値に持つことを許すかどうかを表す真偽値。デフォルトはtrue。

### 例

引数として渡されたparamオブジェクトに文字列またはnull以外の値を持つフィールドが存在する場合は正しくないオブジェクトと判定されます。

```js
// "time_max"フィールドの値が数値であるため、
// resultはfaiseとなります。
let result = param.validateParams({
  "time_max": 500,
}, {});

console.log(result);
```

また、paramの値が正しくない場合も正しくないオブジェクトと判定されます。

```js
// "clear_type"というparamの値は"1", "2", "3"のいずれかでなければならないため、
// resultはfalseとなります。
let result = param.validateParams({
  "clear_type": "4",
  "time_max": "500",
}, {});

console.log(result);
```

一方、存在しないparam名があっても不正とは見なされません。存在しないparam名を許したくない場合は、allowExtraneousオプションをfalseとします。

```js
// "foo"というparam名は存在しませんが不正とは見なされないため、
// resultはtrueとなります。
let result = param.validateParams({
  "foo": "bar",
}, {});

console.log(result);

// ただし、allowExtraneousオプションを指定した場合は
// falseとなります。
result = param.validateParams({
  "foo": "bar",
}, {
  allowExtraneous: true,
});

```

paramの中には好きな文字列を設定できるものもあります。そのようなparamにおけるデータ量の肥大化を防ぐためにmaxLengthオプションを使用できます。

maxLengthオプションを指定した場合、自由に文字列を指定できるparamの値の長さがそれより長い場合は不正と見なされるようになります。
```js
// maxLengthが10なので、11文字以上の長さの文字列をparamに指定した場合は不正となります。
// この例では"hitokoto1-1"が17文字あるためresultはfalseとなります。
result = param.validateParams({
  "hitokoto1_name": "浩二",
  "hitokoto1-1": "今日は、いい天気だなあ、なんてね。"
}, {
	maxLength: 10,
});
```

## param.paramKeys
**param.paramKeys**は、存在するparam名全ての配列です。

## param.resourceKeys
**param.resourceKeys**は、param名のうちファイル名を示すもの全ての配列です。

## param.data
**param.data**は、全てのparam値の定義が入ったオブジェクトです。

各paramの定義は`param.data["clear_type"]`のように取得できます。

それぞれのparamの定義はオブジェクトであり、次のプロパティを持ちます。

- **type**: このparamが受け付ける値の種類です（後述）。
- **description**: このparamの説明です。
- **default**: このparamのデフォルト値です。
- **version**: どの正男のバージョンにこのparamが存在するのかを示すオブジェクトです（後述）。

**type**には次の種類があります。
- `"boolean"`: 真偽値です。`"1"`がはい、`"2"`がいいえを表します。
- `"boolean-reversed"`: 真偽値ですが、booleanの場合とは逆で`"2"`がはい、`"1"`がいいえを表します。
- `"integer"`: 整数値です。このタイプのparamはさらに**min**プロパティと**max**プロパティを持ち、可能な整数の範囲を表します。
- `"string"`: 自由に指定可能な文字列です。
- `"resource"`: ファイル名です。
- `"map"`: マップデータです。
- `"layer"`: レイヤーデータです。
- `"chizu"`: 地図画面のマップデータです。
- `"enum"`: いくつかの選択肢から選択するparamです。このタイプのparamはさらに**enumValues**プロパティを持ち、これは可能な選択肢とその説明を列挙した配列です。

### 例
`"j_fire_equip"`の説明は次のようなオブジェクトになっています。
```json
  {
    "description": "ファイヤーボールを標準装備する",
    "type": "boolean-reversed",
    "default": "1",
    "version": {
        "2.8": false
    }
  }
```

このparamは`"2"`にすると正男にファイヤーボールが最初から装備されます。このparamは2.8版には存在せずFX以降に存在するため、versionプロパティでそのことが示されています。

`"mizunohadou_red"`には0から255の整数を指定する必要があるため、次のように定義されています。
```json
  {
    "description": "水の波動,人間大砲(本体)の色（R）",
    "type": "integer",
    "min": 0,
    "max": 255,
    "default": "0"
  }
```

`"airms_kf"`は1から5までのいずれかの値を指定する必要があり、次のように定義されています。
```json
  {
    "description": "エアームズの攻撃パターン",
    "type": "enum",
    "enumValues": [
      {
        "value": "1",
        "description": "壁に当たると止まる"
      },
      {
        "value": "2",
        "description": "壁に当たると向きを変える"
      },
      {
        "value": "3",
        "description": "その場で爆弾投下"
      },
      {
        "value": "4",
        "description": "その場でグレネード投下"
      },
      {
        "value": "5",
        "description": "左右に動いて爆弾投下"
      }
    ],
    "default": "1",
    "version": {
        "2.8": ["1","2"]
    }
  }
```

`"airms_kf"`はバージョン2.8にも存在しますが、バージョン2.8では値は`"1"`と`"2"`のどちらかでした。versionプロパティによりそのことが示されています。
