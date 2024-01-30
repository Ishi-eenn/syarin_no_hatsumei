import { Button, Modal, Tabs, Form } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { NormalForm } from "../parts/NormalForm";
import { useState, useContext } from "react";
import { NormalPopup } from "../parts/NormalPopup";
import { formFields } from "../../constants/TopPage/Form";
import { BookDataContext } from "../../main";

export const ListTabs = (props) => {
  const { activeTab, activeChangeHandler } = props;

  const [bookData, setBookData] = useContext(BookDataContext);

  const stock = bookData[0];
  const shelves = bookData.slice(1);


  const [form] = Form.useForm();
  const [popVisible, setPopVisible] = useState(false);

  const headerName = "本棚追加";


  const changeHandler = () => {
    form.validateFields().then((values) => {
      const newShelves = [...shelves];
      const newBooksArray = Array.from({ length: values.boards }, () => []);

      newShelves.push({
        title: values.title,
        id: String(Object.keys(shelves).length+1),
        w: values.w,
        books: newBooksArray
      });

      const newBookData = [stock].concat(newShelves);

      localStorage.setItem("bookData", JSON.stringify(newBookData));
      setBookData(newBookData);
      form.resetFields();
    });
  };



  return (
    <div style={{ display: "flex", gap: "6px 4px" }}>
      <Tabs
        defaultActiveKey={activeTab}
        style={{ flex: 1 }}
        onChange={(id) => activeChangeHandler(id)}
      >
        {shelves.map((item) => (
          <Tabs.Tab title={item.title} key={item.id} />
        ))}
      </Tabs>
      <Button
        style={{ padding: "10px", border: "none" }}
        onClick={() =>
          Modal.confirm({
            cancelText: "取り消し",
            confirmText: "追加",
            closeOnMaskClick: true,
            content: (
              <NormalForm
                form={form}
                formFields={formFields}
                headerName={headerName}
              />
            ),
            onConfirm: async () => {
              try {
                await form.validateFields();
                changeHandler();
              } catch (errorInfo) {
                setPopVisible(true);
              }
            },
          })
        }
      >
        <AddOutline />
      </Button>
      <NormalPopup popVisible={popVisible} setPopVisible={setPopVisible}/>
    </div>
  );
};
