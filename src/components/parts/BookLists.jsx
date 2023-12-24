import { useState } from 'react'
import { FloatingBubble, InfiniteScroll, List, Modal, SwipeAction } from 'antd-mobile'
import { AddCircleOutline } from 'antd-mobile-icons';

export const BookLists = () => {

    const [books, setBooks] =
        useState(['進撃の巨人', 'ワンピース', '情報可視化入門',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U'
       ])

    const rightActions = [{ key:'delete', text:'削除', color:'danger'}]

    const deleteHandler = (index) => {
        const newBooks = [...books]
        newBooks.splice(index, 1)
        setBooks(newBooks)
    }

    const clickHandler = () => {
        Modal.show({
            content: '本の追加実装',
            closeOnAction: true,
            actions: [{
                key:'add',
                text: 'add',
            }]
        })
    }

    return (
        <>
            <List>
                {books.map( (item, index) => (
                    <SwipeAction
                        key={item}
                        rightActions={rightActions}
                        onAction={() => deleteHandler(index)}
                    >
                    <List.Item>{item}</List.Item>
                    </SwipeAction>
                ))}
            </List>
            <InfiniteScroll />
            <FloatingBubble
                style={{
                    '--initial-position-bottom': '100px',
                    '--initial-position-right': '30px',
                    '--edge-distance': '50px',}}
                onClick={clickHandler} >
                    <AddCircleOutline fontSize={50} />
                </FloatingBubble>
        </>
    )
}
