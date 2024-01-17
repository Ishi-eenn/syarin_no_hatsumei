import { useState } from "react"
import { BookShelf } from "../templates/BookShelf"
import { ListTabs } from "../templates/ListTabs"
import { BookShelves } from "../templates/BookShelves";

export const Top = () => {

  const [activeTab, setActiveIndex] = useState(1);

  const [shelves, setShelves] = useState([
    {
        title: '本棚1',
        key: '1',
        unit: '',
        h: '120',
        w: '50',
        boards: '2',
        roomH: '40'
    },
    {
        title: '本棚2',
        key: '2',
        unit: '',
        h: '120',
        w: '70',
        boards: '3',
        roomH: '30'
    }
  ])


  const activeChangeHandler = (index) => {
    setActiveIndex(index);
  };

  const shelvesChangeHandler = (newShelves) => {
    setShelves(newShelves);
  }

  return (
    <>
      <ListTabs
        activeTab={activeTab}
        activeChangeHandler={activeChangeHandler}
        shelves={shelves}
        shelvesChangeHandler={shelvesChangeHandler}
      />
      <BookShelves activeTab={activeTab} shelves={shelves} />
    </>
  )
}
