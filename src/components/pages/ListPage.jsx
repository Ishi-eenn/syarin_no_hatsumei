import { Tag } from "antd-mobile"
import { BookLists } from "../templates/BookLists"

export const ListPage = () => {
  return (
    <div style={{ flex:1, flexDirection:'column' }}>
        <Tag fill='outline' >本リスト</Tag>
        <BookLists />
    </div>
  )
}
