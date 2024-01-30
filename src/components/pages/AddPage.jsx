import {
  AutoCenter,
  Form,
  Tabs,
  List,
  Button,
} from "antd-mobile";
import { useRef, useState, useContext, useEffect } from "react";
import Scanner from "../../features/Scanner";
import { BookDataContext } from "../../main";
import FetchData from "../../features/FetchData";
import { ListItem } from "antd-mobile/es/components/list/list-item";
import { useNavigate } from "react-router-dom";
import Quagga from "quagga";
import { NormalPopup } from "../parts/NormalPopup";
import { AddCardForm } from "../templates/AddCardForm";
import { formFields } from "../../constants/AddPage/Forms";
import { tabItems } from "../../constants/AddPage/Tab";
import { keywordFormFields } from "../../constants/AddPage/Forms";

export const AddPage = () => {
  const [bookData, setBookData] = useContext(BookDataContext);
  const [manualForm] = Form.useForm();
  const [keywordForm] = Form.useForm();
  const [fetchedData, setFetchedData] = useState("");
  const [scannerBook, setScannerBook] = useState("");
  const [popVisible, setPopVisible] = useState(false);
  const myQuaggaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scannerBook !== "") {
      addScanneredBook();
      Quagga.stop();
      myQuaggaRef.current.style.display = "none";
    }
  }, [scannerBook]);

  const changeHandler = () => {
    manualForm.validateFields().then((values) => {
      const newBooks = [...bookData];
      //isbnは仮
      newBooks[0].books.push({
        bookName: values.title,
        bookSize: values.width,
      });
      newBooks.sort();
      setBookData(newBooks);
      manualForm.resetFields();
      navigate("/list");
    })
    .catch((error) => {
      setPopVisible(true);
    });
  };


  const addBookDataBySelectedBookName = (index) => {
    const newBooks = [...bookData];
    newBooks[0].books.push({
      bookName: fetchedData[index].bookName,
      bookSize: fetchedData[index].bookSize,
    });
    newBooks.sort();
    setBookData(newBooks);
    manualForm.resetFields();
    navigate("/list");
  };

  const handleGetFieldName = async () => {
    keywordForm.validateFields().then(async(values) => {
      let inputValue = values.keyword;
      // inputValueが数値の場合、シングルクォーテーションを外す
      if (!isNaN(inputValue)) {
        inputValue = Number(inputValue);
      }

      const d = await FetchData(inputValue);
      setFetchedData(d);
    })
    .catch((error) => {
      setPopVisible(true);
    });
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

  // formのprops
  const headerName = null;

  const manualFormProps = {
    cardTitle: "本の追加",
    formProps :{
      form: manualForm,
      formFields: formFields,
      headerName: headerName,
    }
  }

  const keywordFormProps = {
    cardTitle:"本の検索",
    formProps: {
      form: keywordForm,
      formFields: [{
        ...keywordFormFields,
        extra: <a onClick={handleGetFieldName}>検索</a>
      }],
      headerName: headerName,
    }
  }
  
  return (
    <>
      <Tabs>
        <Tabs.Tab title={tabItems[0].title} key={tabItems[0].key}>
          <AddCardForm {...manualFormProps} />
          <AutoCenter>
            <Button onClick={changeHandler}>追加</Button>
          </AutoCenter>
        </Tabs.Tab>
        
        <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}>
          <AddCardForm {...keywordFormProps} />
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
      <NormalPopup popVisible={popVisible} setPopVisible={setPopVisible} />
    </>
  );
};
