import { AutoCenter, Card, Radio, Form, Input, Tabs } from "antd-mobile";
import { NormalButton } from "../parts/NormalButton";
import { NormalTag } from "../parts/NormalTag";
import { useRef, useState } from "react";

export const AddPage = () => {
  const [bookData, setbookDate] = useState("book");
  // const[Form] = Form.useForm<FieldType>();
  // const account = Form.useWatch('account', form);
  const tabItems = [
    { key: "book", title: "入力" },
    { key: "barcode", title: "バーコード" },
  ];

  const changeHandler = () => {
    setbookDate("books");
  };

  console.log(bookData);

  return (
    <>
      <AutoCenter>
        <Tabs>
          <Tabs.Tab title={tabItems[0].title} key={tabItems[0].key}>
            <Card
              title="本の追加"
              bodyStyle={{ border: "solid 2px", background: "gray" }}
            >
              <Radio.Group>
                <Radio value="all">完全一致</Radio>
                <Radio value="series">シリーズ検索</Radio>
              </Radio.Group>

              <Form layout="vertical" mode="card">
                <Form.Item extra={<a>検索</a>}>
                  <Input placeholder="" />
                </Form.Item>
              </Form>
            </Card>
          </Tabs.Tab>
          <Tabs.Tab title={tabItems[1].title} key={tabItems[1].key}></Tabs.Tab>
        </Tabs>
        <AutoCenter>
          <NormalButton
            text="追加"
            style={{ color: "primary", fill: "solid" }}
            onClick={changeHandler}
          />
        </AutoCenter>
      </AutoCenter>
    </>
  );
};
