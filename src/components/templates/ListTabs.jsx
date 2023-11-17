import { Button, Modal, Tabs } from "antd-mobile"
import { AddOutline } from 'antd-mobile-icons'
import { NormalForm } from "./NormalForm"


export const ListTabs = () => {

    let tabs = [
        {
            title: '本棚1',
            key: '1'
        },
        {
            title: '本棚2',
            key: '2'
        }
    ]

    

    return (
        <div style={{ display:"flex", gap:'6px 4px'}}>
            <Tabs defaultActiveKey='1' style={{ flex:1 }}>
                {tabs.map( (item) => (
                    <Tabs.Tab title={item.title} key={item.key} />
                ))}
            </Tabs>
            <Button style={{ padding:'10px', border:'none' }} onClick={ () => Modal.show({
                closeOnMaskClick: true,
                showCloseButton: true,
                content: <NormalForm/>
            })}>
                <AddOutline />
            </Button>
        </div>
    )
}
