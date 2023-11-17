import { Tag } from "antd-mobile"
import { BookLists } from "../templates/BookLists"

export const ListPage = () => {
  return (
    <>
        <Tag fill='outline' >本リスト</Tag>
        <BookLists />
    </>
  )
}
