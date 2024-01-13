import { Form, Input, Radio } from "antd-mobile"

export const NormalForm = (props) => {

    const { form } = props;


  const inputs = [
    {
      name: 'title',
      label: '本棚の名前',
      placeHolder: ''
    },
    {
      name: 'h',
      label:'縦',
      placeHolder:'5cm'
    },
    {
      name: 'w',
      label: '横',
      placeHolder: '10cm'
    },
    {
      name: 'boards',
      label: '板の枚数',
      placeHolder: '2枚'
    },
  ]

  return (
    <Form form={form} >
      <Form.Header>本棚追加</Form.Header>
      <Form.Item name='unit' initialValue='cm'>
        <Radio.Group>
          <Radio value='cm' name='cm'>cm</Radio>
          <Radio value='mm' name='mm'>mm</Radio>
        </Radio.Group>
      </Form.Item>
      {inputs.map( (item) => (
        <Form.Item name={ item.name } label={ item.label } key={ item.label }>
          <Input placeholder={ item.placeHolder } />
        </Form.Item>
      ))}
    </Form>
  )
}
