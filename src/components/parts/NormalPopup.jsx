import { Popup } from "antd-mobile";


export const NormalPopup = (props) => {
  const {popVisible, setPopVisible} = props;


  return (
    <Popup
      position='top'
      bodyStyle={{
        marginLeft:'5vw',
        width: '90vw',
        height:'10vh',
        textAlign:"center",
        fontWeight:'bold',
        color:'red',
        fontSize:16,
        lineHeight:'10vh',
        backgroundColor:'white',
        borderRadius: 10
      }}
      visible={popVisible}
      onMaskClick={() => setPopVisible(false)}>
        フォーム内の全ての値を入力してください。
    </Popup>
  )
}
