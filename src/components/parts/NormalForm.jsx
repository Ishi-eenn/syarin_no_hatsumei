import { Form, Input, Radio } from "antd-mobile";

export const NormalForm = (props) => {
  const { form, formFields, headerName } = props;

  return (
    <Form form={form}>
      <Form.Header>{headerName}</Form.Header>
      {formFields.map((item) => (
        <Form.Item key={item.label} {...item} >
          <Input placeholder={item.placeHolder} />
        </Form.Item>
      ))}
    </Form>
  );
};
