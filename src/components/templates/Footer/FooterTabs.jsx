import { SafeArea, TabBar } from 'antd-mobile'
import {
    AppOutline,
    AddOutline,
    ContentOutline
  } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'

export const FooterTabs = () => {

  const navigate = useNavigate();

  const tabs = [
    {
      key: '/home',
      title: 'ホーム',
      icon: <AppOutline />,
    },
    {
      key: '/add',
      title: '追加',
      icon: <AddOutline />
    },
    {
      key: '/list',
      title: '本リスト',
      icon: <ContentOutline />,
    }
  ]

  const changeHandler = (value) =>{
    navigate(value);
  }


  return (
    <>
        <SafeArea position='bottom' style={{ height:'7vh' }} />
        <TabBar onChange={value => changeHandler(value)} style={{ width:'100%', height: '7vh' ,position:'fixed', bottom:0, backgroundColor:'orange', borderTopLeftRadius: '10px', borderTopRightRadius:'10px'}} >
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
        </TabBar>
    </>
  )
}
