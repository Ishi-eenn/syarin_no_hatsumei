import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    AddOutline,
    ContentOutline
  } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import './styles.css';

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
    <div className='container'>
        <TabBar onChange={value => changeHandler(value)} style={{ height:20 }}>
            {tabs.map(item => (
                <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
            ))}
        </TabBar>
    </div>
  )
}
