import { useRef, useState, useContext, useEffect } from "react";
import {
  FloatingBubble,
  List,
  Modal,
  SwipeAction,
  Form,
  Tabs,
  Card,
} from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { NormalForm } from "../parts/NormalForm";
import { BookDataContext } from "../../main.jsx";
import Scanner from "../../features/Scanner.jsx";
import Quagga from "quagga";
import FetchData from "../../features/FetchData";
import { ListItem } from "antd-mobile/es/components/list/list-item";
import { click } from "@testing-library/user-event/dist/click";
import { useNavigate } from "react-router-dom";
//import { AddPage } from "../pages/AddPage";

const PrintHandler = (Books) => {
  if (Books || Books === null) console.log("Books is null");
  else console.log(Books);
  return (
    <>
      {!Books &&
        Books.map((item, index) => {
          <ListItem>{item.bookName}</ListItem>;
        })}
    </>
  );
};

export const BookLists = () => {
  const [bookData, setBookData] = useContext(BookDataContext);
  const [tabKey, setTabKey] = useState("book");
  const [scannerBook, setScannerBook] = useState("0000000000000");
  const myQuaggaRef = useRef(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const headerName = null;
  const formFields = [
    {
      name: "title",
      label: "題名",
      placeHolder: "ここに入力",
    },
    {
      name: "width",
      label: "ページ数",
      placeHolder: "ここに入力",
    },
  ];

  const tabItems = [
    { key: "book", title: "入力" },
    { key: "keyword", title: "キーワード検索" },
    { key: "barcode", title: "バーコード" },
  ];

  const rightActions = [{ key: "delete", text: "削除", color: "danger" }];

  const deleteHandler = (shelfIndex, stageIndex, bookIndex) => {
    const newBookData = [...bookData];

    if (shelfIndex === 0) {
      newBookData[shelfIndex].books.splice(bookIndex, 1);
    } else {
      newBookData[shelfIndex].books[stageIndex].splice(bookIndex, 1);
    }
    localStorage.setItem("bookData", JSON.stringify(newBookData));
    setBookData(newBookData);
  };

  const exactSearchHandler = () => {
    form.validateFields().then((values) => {
      const newBooks = [...bookData];
      //isbnは仮
      newBooks[0].books.push({
        bookName: values.title,
        bookSize: values.width,
      });
      newBooks.sort();
      localStorage.setItem("bookData", JSON.stringify(newBooks));
      setBookData(newBooks);
      form.resetFields();
    });
  };

  const handleButtonClick = () => {
    // ここでAddPageコンポーネントを呼び出すなどの処理を実行
    console.log("Button clicked");
    navigate("/add");
  };

  return (
    <>
      <List>
        {bookData.map((shelf, shelfIndex) => (
          <div key={shelfIndex}>
            {/* 本棚のタイトルを表示 */}
            <h3>{shelf.title}</h3>

            {/* 本のリストを表示 */}
            {shelf.books.length > 0
              ? Array.isArray(shelf.books[0])
                ? shelf.books.map((row, stageIndex) =>
                    row.map((book, bookIndex) => (
                      <SwipeAction
                        key={bookIndex}
                        rightActions={rightActions}
                        onAction={() =>
                          deleteHandler(shelfIndex, stageIndex, bookIndex)
                        }
                      >
                        <List.Item key={bookIndex}>{book.bookName}</List.Item>
                      </SwipeAction>
                    ))
                  )
                : shelf.books.map((book, bookIndex) => (
                    <SwipeAction
                      key={bookIndex}
                      rightActions={rightActions}
                      onAction={() => deleteHandler(shelfIndex, 0, bookIndex)}
                    >
                      <List.Item key={bookIndex}>{book.bookName}</List.Item>
                    </SwipeAction>
                  ))
              : null}
          </div>
        ))}
      </List>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "100px",
          "--initial-position-right": "30px",
          "--edge-distance": "50px",
        }}
        onClick={handleButtonClick}
      >
        <AddCircleOutline fontSize={50} />
      </FloatingBubble>
    </>
  );
};
