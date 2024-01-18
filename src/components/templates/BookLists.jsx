import { useRef, useState, useContext } from "react";
import {
  FloatingBubble,
  InfiniteScroll,
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

export const BookLists = () => {
  const [bookData, setBookData] = useContext(BookDataContext);
  const [tabKey, setTabKey] = useState("book");
  const [scannerBook, setScannerBook] = useState("0000000000000");
  const myQuaggaRef = useRef(null);

  const [form] = Form.useForm();
  const headerName = null;
  const formFields1 = [
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

  const formFields2 = [
    {
      name: "titleORisbn",
      label: "題名もしくはISBN",
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
    setBookData(newBookData);
  };

  const exactSearchHandler = () => {
    form.validateFields().then((values) => {
      const newBooks = [...bookData];
      //isbnは仮
      newBooks[0].books.push({ isbn: 12312, bookName: values.title });
      newBooks.sort();
      setBookData(newBooks);
      form.resetFields();
    });
  };

  const barcodeSearchHandler = () => {
    Quagga.stop();
    myQuaggaRef.current.style.display = "none";
  };

  const clickHandler = (props) =>
    Modal.confirm({
      cancelText: "取り消し",
      confirmText: "本追加",
      closeOnMaskClick: true,
      forceRender: true,
      content: (
        <Tabs onChange={(index) => setTabKey(index)}>
          <Tabs.Tab title={tabItems[0].title} key={tabItems[0].key}>
            <Card
              title="本の追加"
              bodyStyle={{ border: "solid 2px", background: "gray" }}
            ></Card>
            <NormalForm
              form={form}
              formFields={formFields1}
              headerName={headerName}
            />
          </Tabs.Tab>
          <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}></Tabs.Tab>
          <Tabs.Tab title={tabItems[2].title} key={tabItems[2].key}>
            <Scanner
              stopHandler={barcodeSearchHandler}
              myQuaggaRef={myQuaggaRef}
              setScannerBook={setScannerBook}
            />
          </Tabs.Tab>
        </Tabs>
      ),
      onConfirm: () => {
        if (tabKey === "book") {
          exactSearchHandler();
        } else if (tabKey === "keyword") {
          //完全一致検索の処理
        } else {
          barcodeSearchHandler();
        }
      },
    });

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
      <InfiniteScroll />
      <FloatingBubble
        style={{
          "--initial-position-bottom": "100px",
          "--initial-position-right": "30px",
          "--edge-distance": "50px",
        }}
        onClick={() => clickHandler({ inputVal, setInputValue })}
      >
        <AddCircleOutline fontSize={50} />
      </FloatingBubble>
    </>
  );
};
