import { useState, useContext } from "react";
import { ListTabs } from "../templates/ListTabs";
import { BookShelves } from "../templates/BookShelves";
import { BookDataContext } from "../../main";

export const Top = () => {
  const [activeTab, setActiveIndex] = useState(1);
  const [bookData] = useContext(BookDataContext);
  const tmp = [...bookData];
  const [stock, ...bookshelf] = tmp;

  const [shelves, setShelves] = useState([...bookshelf]);


  const activeChangeHandler = (index) => {
    setActiveIndex(index);
  };

  const shelvesChangeHandler = (newShelves) => {
    const newBookData = [stock, ...newShelves];
    localStorage.setItem("bookData", JSON.stringify(newBookData));
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
