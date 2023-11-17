import { Tabs } from "antd-mobile"


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
        <Tabs defaultActiveKey='1'>
            {tabs.map( (item) => (
                <Tabs.Tab title={item.title} key={item.key} />
            ))}
        </Tabs>
    )
}
