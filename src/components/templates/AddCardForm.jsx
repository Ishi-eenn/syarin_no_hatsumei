import{ Card } from "antd-mobile";
import { NormalForm } from "../parts/NormalForm";


export const AddCardForm = (props) => {

  const { cardTitle, formProps } = props;

  return (
    <>
      <Card
        title={cardTitle}
        bodyStyle={{ border: "solid 2px", background: "gray" }}
      ></Card>
      <NormalForm {...formProps} />
    </>
  )
}
