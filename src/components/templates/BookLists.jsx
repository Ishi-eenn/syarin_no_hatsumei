import { useEffect, useState, useContext } from "react";
import {
  FloatingBubble,
  InfiniteScroll,
  List,
  Modal,
  SwipeAction,
  Form,
  Tabs,
  Input,
  Card,
} from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { NormalForm } from "../parts/NormalForm";
import { BookDataContext } from "../../main.jsx";

export const BookLists = () => {
  const [bookData, setBookData] = useContext(BookDataContext);

  // const [books, setBooks] = useState([
  //   "進撃の巨人",
  //   "ワンピース",
  //   "情報可視化入門",
  //   "A",
  //   "B",
  //   "C",
  //   "D",
  //   "E",
  //   "F",
  //   "G",
  //   "H",
  //   "I",
  //   "J",
  //   "K",
  //   "L",
  //   "M",
  //   "N",
  //   "O",
  //   "P",
  //   "Q",
  //   "R",
  //   "S",
  //   "T",
  //   "U",
  // ]);

  const [form] = Form.useForm();
  const headerName = null;
  const formFields = [
    {
      name: "title",
      label: "題名",
      placeHolder: "ここに入力",
    },
  ];

  const tabItems = [
    { key: "book", title: "入力" },
    { key: "barcode", title: "バーコード" },
  ];

  const rightActions = [{ key: "delete", text: "削除", color: "danger" }];

  const deleteHandler = (shelfIndex, bookIndex) => {
    const newBookData = [...bookData];
    newBookData[shelfIndex].books.splice(bookIndex, 1);
    setBookData(newBookData);
  };

  const changeHandler = () => {
    form.validateFields().then((values) => {
      const newBooks = [...bookData];
      //isbnは仮
      newBooks[0].books.push({ isbn: 12312, bookName: values.title });
      newBooks.sort();
      setBookData(newBooks);
      form.resetFields();
    });
  };

  const clickHandler = () =>
    Modal.confirm({
      cancelText: "取り消し",
      confirmText: "追加",
      closeOnMaskClick: true,
      content: (
        <Tabs>
          <Tabs.Tab title={tabItems[0].title} key={tabItems[0].key}>
            <Card
              title="本の追加"
              bodyStyle={{ border: "solid 2px", background: "gray" }}
            ></Card>
            <NormalForm
              form={form}
              formFields={formFields}
              headerName={headerName}
            />
          </Tabs.Tab>
          <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}></Tabs.Tab>
        </Tabs>
      ),
      onConfirm: () => {
        changeHandler();
      },
    });

  useEffect(() => {
    // console.log(bookData);
  }, [bookData]);

  return (
    <>
      <List>
        {bookData.map((shelf, shelfIndex) => (
          shelf.books.length > 0
            ? Array.isArray(shelf.books[0])
              ? shelf.books.map((row) => (
                row.map((book, bookIndex) => (
                  <SwipeAction
                    key={bookIndex}
                    rightActions={rightActions}
                    onAction={() => deleteHandler(shelfIndex, bookIndex)}
                  >
                    <List.Item key={bookIndex}>{book.bookName}</List.Item>
                  </SwipeAction>
                ))
              ))
              : shelf.books.map((book, bookIndex) => (
                <SwipeAction
                  key={bookIndex}
                  rightActions={rightActions}
                  onAction={() => deleteHandler(shelfIndex, bookIndex)}
                >
                  <List.Item key={bookIndex}>{book.bookName}</List.Item>
                </SwipeAction>
              ))
            : null
        ))}
      </List>
      <InfiniteScroll />
      <FloatingBubble
        style={{
          "--initial-position-bottom": "100px",
          "--initial-position-right": "30px",
          "--edge-distance": "50px",
        }}
        onClick={clickHandler}
      >
        <AddCircleOutline fontSize={50} />
      </FloatingBubble>
    </>
  );
};
