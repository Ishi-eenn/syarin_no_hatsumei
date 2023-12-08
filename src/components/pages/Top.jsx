import { useState } from "react"
import { BookShelf } from "../templates/BookShelf"
import { ListTabs } from "../templates/ListTabs"

export const Top = () => {

  const [activeTab, setActiveIndex] = useState(1);

  const activeChangeHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <ListTabs activeTab={activeTab} activeChangeHandler={activeChangeHandler} />
      <BookShelf />
    </>
  )
}
