import { Form, Input, Button, Radio } from "antd-mobile"

export const NormalForm = () => {

  const inputs = [
    {
      label:'縦',
      placeHolder:'5cm'
    },
    {
      label: '横',
      placeHolder: '10cm'
    },
    {
      label: '板の枚数',
      placeHolder: '2枚'
    },
    {
      label:'板間の長さ',
      placeHolder: '2cm'
    }
  ]


  return (
    <Form footer={ <Button block type='submit' color='primary' size='large' >追加</Button> }>
      <Form.Header>本棚追加</Form.Header>
      <Radio.Group defaultValue='cm'>
        <Radio value='cm'>cm</Radio>
        <Radio value='mm'>mm</Radio>
      </Radio.Group>
      {inputs.map( (item) => (
        <Form.Item label={ item.label } key={item.label}>
          <Input placeholder={ item.placeHolder } />
        </Form.Item>
      ))}
    </Form>
  )
}
