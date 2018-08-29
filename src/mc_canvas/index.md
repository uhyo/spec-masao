// template: spec
// title: mc_canvas
// type: official

**mc_canvas**は、canvasまさおの本体です。 [ウェブサイト](http://ryo-9399.github.io/)・[GitHub](https://github.com/Ryo-9399/mc_canvas)

## 用途

mc_canvasは、canvasまさおをウェブページに設置するために必要です。

## サンプル
canvasまさおをウェブページに設置するには、canvasまさおスクリプトを入手し、ぺージ内に読み込みます。

```html
<script src="./CanvasMasao.js"></script>
```

そして、ページ内のcanvasまさおを設置したい場所で次のようなスクリプトを書きます。ゲームの内容はパラメータオブジェクトにより指示します。
```html
<script>
  new CanvasMasao.Game({
    // パラメータオブジェクト（省略）
    "time_max": "200",
  });
</script>
```

また、Javaアプレット時代のまさおは、applet要素とparam要素により記述されています。Java版のまさおは現在ブラウザ上で動作させることはできませんが、canvasまさおスクリプトによりこれをcanvasまさおの設定として読み込むことができます。そのためには **CanvasMasao.Game.replaceAll()** メソッドをページ内のどこかで呼び出します。

```html
<applet code="MasaoConstruction.class" archive="mc_c.jar">
  <!-- ... -->
</applet>
<script>
  CanvasMasao.Game.replaceAll();
</script>
```

## API

### CanvasMasao
`CanvasMasao`オブジェクトは、canvasまさおスクリプトを読み込むとグローバルに定義されます。canvasまさおを動作させるのに必要なのは`CanvasMasao.Game`プロパティです。

### CanvasMasao.Game
`CanvasMasao.Game`はコンストラクタです。Gameのインスタンスを作成することでゲームがひとつ設置されます。[完全なドキュメントを見る](https://uhyo.github.io/mc_canvas/doc/mc_canvas/4.0.0/Game.html)

コンストラクタのシグネチャは次の通りです：`new Game(params, [id], [options])`

`params`は必須で、パラメータオブジェクトです。`id`は文字列で、省略またはnullとすることが可能です。`id`を指定した場合、ゲームがその場に設置される代わりに一致するIDを持つ要素の中に設置されます。

例：
```html
<div id="game"></div>
<!-- ... -->
<script>
  new CanvasMasao.Game({
    // ...
  }, "game");
</script>
```

`options`はオプションオブジェクトであり、拡張機能を追加したり、ゲームをJavaScriptによって拡張するためのコールバック関数を指定したりできます。

#### CanvasMasao.Game.replace(id)
指定されたidを持つapplet要素をcanvasまさおに置換します。

例：
```html
<applet id="Applet1" code="MasaoConstruction.class" archive="mc_c.jar">
  <!-- ... -->
</applet>
<script>
  CanvasMasao.Game.replace("Applet1");
</script>
```

#### CanvasMasao.Game.replaceAll()
ページ内の全てのapplet要素をcanvasまさおに置換します。

例：
```html
<applet code="MasaoConstruction.class" archive="mc_c.jar">
  <!-- ... -->
</applet>
<script>
  CanvasMasao.Game.replaceAll();
</script>
```

