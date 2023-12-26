import { Form, Input, Radio } from "antd-mobile";

export const NormalForm = (props) => {
  const { form, formFields, headerName } = props;

  // const inputs = [
  //   {
  //     name: 'title',
  //     label: '本棚の名前',
  //     placeHolder: ''
  //   },
  //   {
  //     name: 'h',
  //     label:'縦',
  //     placeHolder:'5cm'
  //   },
  //   {
  //     name: 'w',
  //     label: '横',
  //     placeHolder: '10cm'
  //   },
  //   {
  //     name: 'boards',
  //     label: '板の枚数',
  //     placeHolder: '2枚'
  //   },
  //   {
  //     name: 'roomH',
  //     label:'板間の長さ',
  //     placeHolder: '2cm'
  //   }
  // ]

  console.log(formFields);

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
