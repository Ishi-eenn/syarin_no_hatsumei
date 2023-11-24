import { AutoCenter, Card } from "antd-mobile"
import { NormalButton } from "../parts/NormalButton"
import { NormalTag } from "../parts/NormalTag"

export const AddPage = () => {
  
  return (
    <>
      <AutoCenter>
        {/* <NormalTag text="追加" style = {{color:'#000000'}}/> */}
        <Card title='カード' bodyStyle={{ background: 'red' }}></Card>
        <NormalButton text = "追加" style = {{color:'primary',fill:'solid'}}/>
      </AutoCenter>
    </>
  )
}
