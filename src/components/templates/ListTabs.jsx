import { Button, Modal, Tabs, Form } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { NormalForm } from "../parts/NormalForm";
import { useState } from "react";

export const ListTabs = (props) => {
  const { activeTab, activeChangeHandler, shelves, shelvesChangeHandler } =
    props;

  const [form] = Form.useForm();

  const headerName = "本棚追加";
  const formFields = [
    {
      name: "title",
      label: "本棚の名前",
      placeHolder: "",
    },
    {
      name: "h",
      label: "縦",
      placeHolder: "5cm",
    },
    {
      name: "w",
      label: "横",
      placeHolder: "10cm",
    },
    {
      name: "boards",
      label: "板の枚数",
      placeHolder: "2枚",
    },
    {
      name: "roomH",
      label: "板間の長さ",
      placeHolder: "2cm",
    },
  ];

  const activeChange = (key) => {
    const index = shelves.findIndex((item) => item.title === key);
    activeChangeHandler(index);
  };

  const changeHandler = () => {
    form.validateFields().then((values) => {
      const newShelves = [...shelves];
      newShelves.push(values);
      shelvesChangeHandler(newShelves);
    });
  };

  return (
    <div style={{ display: "flex", gap: "6px 4px" }}>
      <Tabs
        defaultActiveKey={activeTab}
        style={{ flex: 1 }}
        onChange={activeChange}
      >
        {shelves.map((item) => (
          <Tabs.Tab title={item.title} key={item.title} />
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
            onConfirm: () => {
              changeHandler();
            },
          })
        }
      >
        <AddOutline />
      </Button>
    </div>
  );
};
