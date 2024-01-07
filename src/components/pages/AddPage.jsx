import { AutoCenter, Card, Radio, Form, Input, Tabs } from "antd-mobile";
import { NormalButton } from "../parts/NormalButton";
import { NormalTag } from "../parts/NormalTag";
import { useRef, useState, useEffect } from "react";
import { cacheNames } from "workbox-core";

export const AddPage = () => {
  const [form] = Form.useForm();

  const tabItems = [
    { key: "book", title: "入力" },
    { key: "barcode", title: "バーコード" },
  ];

  const handleGetFieldName = () => {
    form.validateFields().then((values) => {
      // valuesオブジェクトにはフォーム内の各フィールドの値が含まれています
      const inputValue = values.inputFieldName;
      console.log("入力された値:", inputValue);
    });
  };

  return (
    <>
      <Tabs>
        <Tabs.Tab title={tabItems[0].title} key={tabItems[0].key}>
          <Card
            title="本の追加"
            bodyStyle={{ border: "solid 2px", background: "gray" }}
          >
            <Form layout="vertical" mode="card" form={form}>
              <Form.Item
                name="inputFieldName" // フィールド名を指定
                extra={<a onClick={handleGetFieldName}>検索</a>}
              >
                <Input placeholder="" />
              </Form.Item>
            </Form>
          </Card>
        </Tabs.Tab>
        <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}></Tabs.Tab>
      </Tabs>
      <AutoCenter>
        <NormalButton text="追加" style={{ color: "primary", fill: "solid" }} />
      </AutoCenter>
    </>
  );
};
