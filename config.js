/* =========================================================
   SANS TOI MAMIE ／ サイト設定ファイル
   ---------------------------------------------------------
   店舗情報・料金・ギャラリー写真は、すべてこのファイルで管理します。
   ここを書き換えるだけで、サイト内すべてのページに反映されます。

   ■ 空欄（""）の項目は、サイト上に一切表示されません。
   ■ 確認済みの情報だけを入力してください。
   ========================================================= */

window.SITE = {
  name:    "サントワマミー",
  nameEn:  "SANS TOI MAMIE",
  genre:   "スナック",
  area:    "長崎・思案橋",
  zip:     "850-0901",
  address: "長崎県長崎市本石灰町4-13",

  /* ↓ 確認できたら入力してください。空欄のままなら非表示になります。 */
  tel:     "",   // 例: "095-000-0000"
  hours:   "",   // 例: "20:00 – 翌1:00"
  holiday: "",   // 例: "日曜日"
  line:    "https://lin.ee/uEt7tqSk",   // ★ CONTACTページ「LINEでお問い合わせ」ボタンのリンク先（公式LINEのURL）
                 //   例: "https://lin.ee/xxxxxxx"  空欄の間はボタンが無効（押せない）表示になります

  instagram: "https://www.instagram.com/santowamami2/", // ★ CONTACTページの「Instagram」ボタンとTOPページ EVENT & NEWS のアイコンのリンク先（InstagramのURL）
                 //   例: "https://www.instagram.com/xxxxx/"  空欄の間はボタンが無効（押せない）表示になります

  /* CONTACTページに表示する電話番号（ACCESS・TOPには表示されません） */
  contactTel: "095-822-8788",

  /* Google Maps のURL。空欄なら住所から自動で作成します。 */
  mapUrl:  ""
};


/* =========================================================
   MENU（料金・システム）
   ---------------------------------------------------------
   TOPページの「MENU」に表示されます。ここを書き換えるだけで反映されます。

   { name: "項目名", price: "3,000円", note: "補足（省略可）" }

   ・price に数字が入っていると、金額として大きく表示されます
     （例 "3,000円"）。「別料金」「歌い放題」などの文字も入れられます。
   ・featured: true のカテゴリは、一番上に目立つ形で表示されます。
   ・tag … 金額の横に付ける小さなラベル（例 "歌い放題付き"）
   ========================================================= */

window.MENU = [
  {
    en: "ALL YOU CAN DRINK",
    ja: "飲み放題",
    featured: true,
    items: [
      { name: "飲み放題", price: "3,000円", tag: "歌い放題付き",
        note: "飲み放題をご利用の場合は、カラオケも歌い放題です。" }
    ]
  },
  {
    en: "SET",
    ja: "セット料金",
    items: [
      { name: "男性", price: "3,000円" },
      { name: "女性", price: "2,500円" }
    ]
  },
  {
    en: "KARAOKE",
    ja: "カラオケ",
    items: [
      { name: "飲み放題をご利用の場合", price: "歌い放題" },
      { name: "飲み放題をご利用されない場合", price: "1曲ごとに別料金" }
    ]
  },
  {
    en: "BEER",
    ja: "ビール",
    items: [
      { name: "ビール", price: "別料金", note: "ビールは飲み放題に含まれません。" }
    ]
  }
];

/* MENUの下に表示する注意書き（例: "表示価格は税込です。"）。空なら非表示 */
window.MENU_NOTES = [];


/* =========================================================
   GALLERY（写真）
   ---------------------------------------------------------
   写真は images フォルダ内の同名ファイルを差し替えるだけで変わります。
   枚数を減らしたい場合は、この一覧から行を削除してください。
   （推奨：5〜10枚）
   ========================================================= */

window.GALLERY = [
  /* 並び：店内の全景 → 夜の外観 → 入口 → カウンター → ソファ席 → テーブル席 → カウンター席
     pos … 枠の中で写真のどこを中心に見せるか（省略可。例 "50% 50%"） */
  { file: "images/9441D16D-2AAB-4BF1-B1D3-4B3610492E88.jpg", category: "Interior", caption: "店内",           pos: "50% 70%" },
  { file: "images/gallery-photo-08.jpg", category: "Exterior", caption: "夜の外観",         pos: "50% 50%" },
  { file: "images/gallery-photo-03.jpg", category: "Entrance", caption: "入口",            pos: "50% 45%" },
  { file: "images/gallery-photo-02.jpg", category: "Counter",  caption: "カウンターとボトル棚", pos: "50% 50%" },
  { file: "images/gallery-photo-09.jpg", category: "Sofa",     caption: "ソファ席",         pos: "50% 50%" },
  { file: "images/gallery-photo-05.jpg", category: "Seats",    caption: "テーブル席",        pos: "50% 55%" },
  { file: "images/gallery-photo-07.jpg", category: "Counter",  caption: "カウンター席",      pos: "50% 55%" }
];
