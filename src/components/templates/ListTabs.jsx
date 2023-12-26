import { Button, Modal, Tabs, Form } from "antd-mobile"
import { AddOutline } from 'antd-mobile-icons'
import { NormalForm } from "./NormalForm"
import { useState } from "react"


export const ListTabs = (props) => {

    const { activeTab, activeChangeHandler, shelves, shelvesChangeHandler } = props;

    const [form] = Form.useForm()



    const activeChange = (key) => {
        const index = shelves.findIndex(item => item.title === key)
        activeChangeHandler(index)
    }

    const changeHandler = () => {
        form.validateFields()
            .then((values) => {
                const newShelves = [...shelves]
                const booksArray = Array(Number(values.boards)).fill().map(() => []);

                const newShelf = {
                    title: values.title,
                    id: values.id,
                    h: values.h,
                    w: values.w,
                    books: booksArray
                }
                newShelves.push(newShelf);
                shelvesChangeHandler(newShelves)
            });
    }
    

    return (
        <div style={{ display:"flex", gap:'6px 4px'}}>
            <Tabs defaultActiveKey={activeTab} style={{ flex:1 }} onChange={activeChange}>
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
