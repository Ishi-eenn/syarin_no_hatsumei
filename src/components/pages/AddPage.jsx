import {
  AutoCenter,
  Card,
  Radio,
  Form,
  Input,
  Tabs,
  List,
  Button,
} from "antd-mobile";
import { NormalButton } from "../parts/NormalButton";
import { NormalTag } from "../parts/NormalTag";
import { useRef, useState, useEffect, useContext } from "react";
import { cacheNames } from "workbox-core";
import { NormalForm } from "../parts/NormalForm";
import Scanner from "../../features/Scanner";
import { FormItem } from "antd-mobile/es/components/form/form-item";
import { BookDataContext } from "../../main";
import FetchData from "../../features/FetchData";
import { ListItem } from "antd-mobile/es/components/list/list-item";
import { useNavigate } from "react-router-dom";
import Quagga from "quagga";

export const AddPage = () => {
  const [bookData, setBookData] = useContext(BookDataContext);
  const [form] = Form.useForm();
  const headerName = null;
  const [fetchedData, setFetchedData] = useState("");
  const [scannerBook, setScannerBook] = useState("");
  const navigate = useNavigate();

  const myQuaggaRef = useRef(null);
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

  useEffect(() => {
    if (scannerBook !== "") {
      addScanneredBook();
      Quagga.stop();
      myQuaggaRef.current.style.display = "none";
    }
  }, [scannerBook]);

  const changeHandler = () => {
    form.validateFields().then((values) => {
      const newBooks = [...bookData];
      //isbnは仮
      newBooks[0].books.push({
        bookName: values.title,
        bookSize: values.width,
      });
      newBooks.sort();
      setBookData(newBooks);
      form.resetFields();
      navigate("/list");
    });
  };

  console.log(fetchedData);

  const addBookDataBySelectedBookName = (index) => {
    const newBooks = [...bookData];
    newBooks[0].books.push({
      bookName: fetchedData[index].bookName,
      bookSize: fetchedData[index].bookSize,
    });
    newBooks.sort();
    setBookData(newBooks);
    navigate("/list");
  };

  //   const onepieceISBN = 9784088836447;
  const handleGetFieldName = async () => {
    const values = await form.validateFields();
    let inputValue = values.inputFieldName;
    // inputValueが数値の場合、シングルクォーテーションを外す
    if (!isNaN(inputValue)) {
      inputValue = Number(inputValue);
    }
    const d = await FetchData(inputValue);
    console.log(d);
    setFetchedData(d);
    console.log(fetchedData);
  };

  const addScanneredBook = () => {
    const newBooks = [...bookData];
    newBooks[0].books.push({
      bookName: scannerBook[0].bookName,
      bookSize: scannerBook[0].bookSize,
    });
    newBooks.sort();
    setBookData(newBooks);
    navigate("/list");
  };
  return (
    <>
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
          <AutoCenter>
            <Button onClick={changeHandler}>追加</Button>
          </AutoCenter>
        </Tabs.Tab>
        <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}>
          <Card
            title="本の検索"
            bodyStyle={{ border: "solid 2px", background: "gray" }}
          ></Card>
          <Form form={form}>
            <Form.Item
              name="inputFieldName"
              extra={<a onClick={handleGetFieldName}>検索</a>}
            >
              <Input placeholder="キーワードまたはisbnを入力" />
            </Form.Item>
          </Form>
          <List>
            <>
              {fetchedData.length !== 0 &&
                (fetchedData !== false ? (
                  fetchedData.map((item, index) => (
                    <ListItem
                      key={index}
                      onClick={() => {
                        addBookDataBySelectedBookName(index);
                      }}
                    >
                      {item.bookName}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>みつかりませんでした</ListItem>
                ))}
            </>
          </List>
        </Tabs.Tab>

        <Tabs.Tab title={tabItems[2].title} key={tabItems[2].key}>
          <Scanner myQuaggaRef={myQuaggaRef} setScannerBook={setScannerBook} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
