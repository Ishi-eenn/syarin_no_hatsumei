import { useState } from "react";
import { ListTabs } from "../templates/ListTabs";
import { BookShelves } from "../templates/BookShelves";

export const Top = () => {
  const [activeTab, setActiveIndex] = useState(1);

  const [shelves, setShelves] = useState([
    {
        title: '本棚1',
        id: '1',
        w: '50',
        books: [[], []]
    },
    {
        title: '本棚2',
        id: '2',
        w: '70',
        books: [[], [], []]
    }
  ])


  const activeChangeHandler = (index) => {
    setActiveIndex(index);
  };

  const shelvesChangeHandler = (newShelves) => {
    setShelves(newShelves);
  };

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
  );
};
