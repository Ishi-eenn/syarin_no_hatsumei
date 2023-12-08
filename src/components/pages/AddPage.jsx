import { AutoCenter, Card, Radio ,Form, Input} from "antd-mobile";
import { NormalButton } from "../parts/NormalButton";
import { NormalTag } from "../parts/NormalTag";

export const AddPage = () => {
  var a = {

  };
  console.log(a)
  return (
    <>
      <AutoCenter>
        
        <Card title="本の追加" bodyStyle={{ border:"solid 2px",background: "gray"}}>
          <Radio.Group>
            <Radio value="all">完全一致</Radio>
            <Radio value="series">シリーズ検索</Radio>
          </Radio.Group>
          
          <Form layout='vertical' mode='card' >
            <Form.Item  extra={<a>検索</a>} >
            <Input placeholder='' />
          </Form.Item>
          </Form>

        </Card>
        <AutoCenter>
        <NormalButton text="追加" style={{ color: "primary", fill: "solid" }} />
        </AutoCenter>
      </AutoCenter>
    </>
  );
};
