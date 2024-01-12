import { Form, Input, Radio } from "antd-mobile";

export const NormalForm = (props) => {
  const { form, formFields, headerName } = props;

  return (
    <Form form={form}>
      <Form.Header>{headerName}</Form.Header>
      {formFields.map((item) => (
        <Form.Item name={item.name} label={item.label} key={item.label}>
          <Input placeholder={item.placeHolder} />
        </Form.Item>
      ))}
    </Form>
  );
};
