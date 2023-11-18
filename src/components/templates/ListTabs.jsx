import { Button, Modal, Tabs, Form } from "antd-mobile"
import { AddOutline } from 'antd-mobile-icons'
import { NormalForm } from "./NormalForm"
import { useState } from "react"


export const ListTabs = () => {

    const [form] = Form.useForm()

    const [shelves, setShelves] = useState([
        {
            title: '本棚1',
            key: '1',
            unit: '',
            h: '',
            w: '',
            boards: '',
            roomH: ''
        },
        {
            title: '本棚2',
            key: '2',
            unit: '',
            h: '',
            w: '',
            boards: '',
            roomH: ''
        }
    ])

    const changeHandler = () => {
        form.validateFields()
            .then((values) => {
                const newShelves = [...shelves]
                newShelves.push(values)
                setShelves(newShelves)
            });
    }
    

    return (
        <div style={{ display:"flex", gap:'6px 4px'}}>
            <Tabs defaultActiveKey='1' style={{ flex:1 }}>
                {shelves.map( (item) => (
                    <Tabs.Tab title={item.title} key={item.title} />
                ))}
            </Tabs>
            <Button style={{ padding:'10px', border:'none' }} onClick={ () => Modal.confirm({
                cancelText: '取り消し' ,
                confirmText: '追加' ,
                closeOnMaskClick: true,
                content: <NormalForm form={ form } />,
                onConfirm: () => {
                    changeHandler()
                }
            })}>
                <AddOutline />
            </Button>
        </div>
    )
}
