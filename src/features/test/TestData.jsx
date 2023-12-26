/* 単位はmmで統一 */

export const TEST_DATA = [
  {
    title: "ストック",
    books: [
      {
        isbn: 9784065334928,
        bookName: "中間管理録トネガワ",
        bookSize: 208,
        id: 1,
      },
      {
        isbn: 9784065327722,
        bookName: "星降る王国のニナ（11）",
        bookSize: 176,
        id: 1,
      },
    ],
  },
  {
    title: "本棚1",
    id: "1",
    w: "50",
    /* 段数分の空配列追加して作成 例:2段分のため2つの空配列を用意 */
    books: [[], []],
  },
  {
    title: "本棚2",
    id: "2",
    w: "70",
    books: [
      [
        {
          isbn: 9784065334928,
          bookName: "中間管理録トネガワ",
          bookSize: 208,
          id: 1,
        },
        {
          isbn: 9784065327722,
          bookName: "星降る王国のニナ（11）",
          bookSize: 176,
          id: 1,
        },
      ],
      [
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 208,
          id: 1,
        },
      ],
    ],
  },
];

/* 初期状態 */
export const DEFAULT_DATA = [
  {
    title: "ストック",
    books: [],
  },
];
