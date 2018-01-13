// template: spec
// title: masao-json-format

# masao-json-format

**masao-json-format**は、canvasまさおのステージデータをポータブルなJSON形式で表すためのフォーマットです。masao-json-formatを採用しているサービス・アプリ等の間では正男の相互運用性が期待できます。

## masao-json-formatを採用しているサービスなど

* [masao.space](https://masao.space/)
* MasaoApp

## masao-json-formatの使用方法

### 自ら実装する
masao-json-formatは後述の仕様により定義されています。この仕様に従ったJSONを解釈し、またそのようなJSONを出力することで、masao-json-formatを扱うアプリケーションを作ることができます。

### masao-jsモジュールを使用する
[masao-js](/masao-js/)モジュールはmasao-json-formatの読み込み・書き出しをサポートしています。このモジュールを用いる場合正しくないデータを読み書きしたときにエラーが発生するため、安全にmasao-json-formatデータを扱うことができます。


## 仕様

現在のmasao-json-formatの最新バージョンは**draft-4**です。

### JSON Schema
masao-json-formatを定義したJSON Schemaがあります。

- [JSON Schema (JSON5形式)](./format-schema.json5)

### masao-json-format (draft-4)
masao-json-formatは次の構造を持つオブジェクトです。以下で定義されたフィールドの他に、トップレベルにアプリケーション固有のフィールドを持つことができます。

将来のフィールド追加と衝突しないように、**アプリケーション固有のフィールドは名前が`_`（アンダーバー）で始まることが推奨されます。**

```json
{
  "masao-json-format-version": "draft-4", // required
  "version": <version-string>,            // required
  "metadata": <metadata-object>,          // optional
  "params": <params-object>,              // required
  "script": <script-string>,              // optional
  "advanced-map": <advanced-map-object>   // optional
}
```

#### version
正男のバージョンを表す文字列で、以下のうちいずれかです。

`"2.7"`, `"2.8"`, `"2.81"`, `"2.9"`, `"3.0"`, `"3.11"`, `"3.12"`, `"fx"`, `"fx2"`, `"fx3"`, `"fx4"`, `"fx5"`, `"fx6"`, `"fx7"`, `"fx8"`, `"fx9"`, `"fx10"`, `"fx11"`, `"fx12"`, `"fx13"`, `"fx14"`, `"fx15"`, `"fx16"`, `"kani"`, `"kani2"`

ただし、canvasまさおは全てのバージョンに対応しているわけではありません。ちょうど対応したcanvasまさおのバージョンが存在するのは**2.8**, **fx16**, **kani2**です。

このフィールドは**必須**です。

#### metadata
ゲームのメタデータを持つオブジェクトです。現在、次のものが定義されていますが、全ての情報を持つ必要はありません。

```json
{
  "title": <string>,
  "author": <string>,
  "editor": <string>,
  "url": <string>,
}
```

- **title**: ゲームのタイトル。
- **author**: ゲームの作成者。
- **editor**: 正男を編集したエディタの名前。
- **url**: この正男が存在するURL。正男を遊ぶことができるHTMLページのURLを推奨。

#### params
ゲームのパラメータを保持するオブジェクト。このオブジェクトの全てのフィールドの値は文字列である必要があります。

このフィールドは**必須**です。

#### script
正男を拡張するためのJavaScriptコード。このコードが**userJSCallback**という名前の関数を定義する場合、その関数が拡張JSコールバックとなります。

#### advanced-map
正男が第3版マップデータを使用する場合、マップデータオブジェクトをこのフィールドで指定します。このフィールドが存在しないかnullである場合、第3版マップデータを使用しないと見なされます。

このフィールドが存在する場合、`params`内のマップデータに関するフィールドは無視されます。

TODO (第3版マップデータ)

## 仕様改訂の提案
masao-json-formatの機能拡張・仕様改訂の提案は、[このサイトのGitHub](https://github.com/uhyo/spec-masao)で受け付けます。[このサイトへの貢献](/contributing.html)のページもご確認ください。

