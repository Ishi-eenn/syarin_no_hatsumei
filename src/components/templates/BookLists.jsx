import { useState } from "react";
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

export const BookLists = () => {
  const [books, setBooks] = useState([
    "進撃の巨人",
    "ワンピース",
    "情報可視化入門",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
  ]);

  const [form] = Form.useForm();
  const headerName = null;
  const formFields = [
    {
      name: "title",
      label: "題名",
      placeHolder: "",
    },
  ];

  const tabItems = [
    { key: "book", title: "入力" },
    { key: "barcode", title: "バーコード" },
  ];

  const rightActions = [{ key: "delete", text: "削除", color: "danger" }];

  const deleteHandler = (index) => {
    const newBooks = [...books];
    newBooks.splice(index, 1);
    setBooks(newBooks);
  };

  const changeHandler = () => {
    form.validateFields().then((values) => {
      const newBooks = [...books];
      newBooks.push(values.title);
      newBooks.sort();
      setBooks(newBooks);
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

  return (
    <>
      <List>
        {books.map((item, index) => (
          <SwipeAction
            key={item}
            rightActions={rightActions}
            onAction={() => deleteHandler(index)}
          >
            <List.Item>{item}</List.Item>
          </SwipeAction>
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
