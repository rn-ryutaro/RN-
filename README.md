# SANTOIRE MAMIE（サントワマミー）ホームページ

長崎・思案橋のスナック「サントワマミー」の公式サイト一式です。
ビルド不要の静的サイト（HTML / CSS / JavaScript）なので、フォルダごとサーバーにアップロードすれば公開できます。

## ファイル構成

```
index.html      TOP（アニメーション演出あり）
about.html      ABOUT
menu.html       MENU
gallery.html    GALLERY（ライトボックス）
access.html     ACCESS
contact.html    CONTACT
css/style.css   全ページ共通のデザイン（色・フォントは冒頭の :root で変更）
css/top.css     TOPページ専用の演出
js/config.js    ★ 店舗情報・料金・ギャラリー写真の設定（ここだけ編集すればOK）
js/main.js      共通処理（メニュー開閉・設定の反映）
js/top.js       TOPページの演出
js/gallery.js   ライトボックス
images/         写真
```

## 写真の差し替え

`images/` 内の同じ名前のファイルを上書きするだけで差し替わります（現在は仮画像です）。

| ファイル | 使用場所 | 推奨サイズ |
|---|---|---|
| hero.jpg | TOPのメイン画像 | 横 2400px 程度（横長） |
| about.jpg | TOP・ABOUT | 横 2000px 程度（横長） |
| gallery01.jpg | 外観（TOP ACCESS / ACCESS / GALLERY） | 横 2000px 程度 |
| gallery02〜07.jpg | TOP・ABOUT・GALLERY | 長辺 2000px 程度 |

- 写真は枠に合わせて自動でトリミングされます。主役は中央に置くと切れにくくなります。
- 1枚 300〜500KB 程度に圧縮すると表示が速くなります。
- GALLERYの枚数・キャプションは `js/config.js` の `GALLERY` で変更できます（5〜10枚推奨）。

## 店舗情報・料金の変更

`js/config.js` を開いて書き換えます。

- `tel` / `hours` / `holiday` / `line` は **空欄（""）のままならサイトに表示されません**。確認できた情報だけ入力してください。
- TEL・LINEを入力すると、CONTACTページとACCESSページに自動で表示されます。
- 料金は `MENU` の `items` に `{ name: "項目名", price: "¥0,000", note: "補足" }` の形で追加します。空のカテゴリは「準備中」と表示されます。

## 確認方法

`index.html` をブラウザで開けば確認できます。
（Google マップの埋め込みはインターネット接続時のみ表示されます）
