import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./components/pages/Top";
import { NotFound } from "./components/pages/NotFound";
import React, { createContext } from "react";
import { FooterTabs } from "./common/Footer/FooterTabs";
import { ListPage } from "./components/pages/ListPage";
import { SafeArea } from "antd-mobile";

export const BookDataContext = createContext();

export const Main = () => {
  /* 検索テスト用
  // ISBN、完全一致のみ
  (async () => {
    const onepieceISBN = 9784088836447;
    const d = await FetchData(onepieceISBN);
    // オブジェクトで返ってくる
    console.log(d);
  })();

  // キーワード検索、1件ヒット
  (async () => {
    const d = await FetchData("情報可視化入門");
    // オブジェクト配列(要素数1)で返ってくる
    console.log(d);
  })();

  // キーワード検索、複数件ヒット
  (async () => {
    const d = await FetchData("情報可視化");
    // オブジェクト配列(要素数2以上)で返ってくる
    console.log(d);
  })();

  // 一致するデータがなかった場合
  (async () => {
    const d = await FetchData(9999999999999);
    // falseが返ってくる
    console.log(d);
  })(); */

  // const TEST_DATA = [
  //   {
  //     title: "ストック",
  //     books: [
  //       {
  //         isbn: 9784065334928,
  //         bookName: "中間管理録トネガワ",
  //         bookSize: 208,
  //         id: 0,
  //       },
  //       {
  //         isbn: 9784065327722,
  //         bookName: "星降る王国のニナ（11）",
  //         bookSize: 176,
  //         id: 1,
  //       },
  //     ],
  //   },
  //   {
  //     title: "本棚1",
  //     id: "1",
  //     w: "50",
  //     /* 段数分の空配列追加して作成 例:2段分のため2つの空配列を用意 */
  //     books: [[], []],
  //   },
  //   {
  //     title: "本棚2",
  //     id: "2",
  //     w: "70",
  //     books: [
  //       [
  //         {
  //           isbn: 9784065334928,
  //           bookName: "中間管理録トネガワ(3)",
  //           bookSize: 208,
  //           id: 0,
  //         },
  //         {
  //           isbn: 9784065327722,
  //           bookName: "星降る王国のニナ（11）",
  //           bookSize: 176,
  //           id: 1,
  //         },
  //       ],
  //       [
  //         {
  //           isbn: 9784065334928,
  //           bookName: "情報可視化入門",
  //           bookSize: 208,
  //           id: 0,
  //         },
  //       ],
  //     ],
  //   },
  // ];

  /* const DEFAULT_DATA = [
    {
      title: "ストック",
      books: [],
    },
  ]; */

  const DEFAULT_DATA = [
    {
      title: "ストック",
      books: [
        {
          isbn: 9784065334928,
          bookName: "中間管理録トネガワ",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065327722,
          bookName: "星降る王国のニナ（11）",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
        {
          isbn: 9784065334928,
          bookName: "情報可視化入門",
          bookSize: 15,
          id: 1,
        },
      ],
    },
    {
      title: "本棚1",
      id: "1",
      w: "140",
      /* 段数分の空配列追加して作成 例:2段分のため2つの空配列を用意 */
      books: [[], []],
    },
    {
      title: "本棚2",
      id: "2",
      w: "140",
      books: [
        [
          {
            isbn: 9784065334928,
            bookName: "中間管理録トネガワ",
            bookSize: 15,
            id: 1,
          },
          {
            isbn: 9784065327722,
            bookName: "星降る王国のニナ（11）",
            bookSize: 15,
            id: 1,
          },
        ],
        [
          {
            isbn: 9784065334928,
            bookName: "情報可視化入門",
            bookSize: 15,
            id: 1,
          },
        ],
      ],
    },
  ];

  // localStorage.clear();
  const localBookData = JSON.parse(localStorage.getItem("bookData"));
  const [bookData, setBookData] = React.useState(localBookData);
  if (bookData === null) {
    localStorage.setItem("bookData", JSON.stringify(DEFAULT_DATA));
    setBookData(DEFAULT_DATA);
  }
  // console.log(bookData);
  return (
    <div style={{ height: "100vh" }}>
      <BookDataContext.Provider value={[bookData, setBookData]}>
        <BrowserRouter>
          <SafeArea position="top" style={{ height: "5vh" }} />
          <Routes>
            <Route exact path="/" element={<Top />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FooterTabs />
        </BrowserRouter>
      </BookDataContext.Provider>
    </div>
  );
};
