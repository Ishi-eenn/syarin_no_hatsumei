import { useState, useContext } from "react";
import { ListTabs } from "../templates/ListTabs";
import { BookDataContext } from "../../main";
import { BookShelf } from "../templates/BookShelf/BookShelf";

export const Top = () => {
  const [activeTab, setActiveIndex] = useState(1);
  const [bookData] = useContext(BookDataContext);

  const [tier, setTier] = useState(
    bookData
      .filter((shelf) => shelf.id === '1')
      .flatMap((shelf) =>
        shelf.books.map((booksArray, i) =>
          booksArray.map((book, index) => ({
            id: `${i + 1}-${index + 1}`,
            content: book.bookName,
            bookSize: book.bookSize,
          }))
        )
      )
  );

  const activeChangeHandler = (id) => {
    setActiveIndex(Number(id));
    setTier(bookData
    .filter((shelf) => shelf.id === id)
    .flatMap((shelf) =>
      shelf.books.map((booksArray, i) =>
        booksArray.map((book, index) => ({
          id: `${i + 1}-${index + 1}`,
          content: book.bookName,
          bookSize: book.bookSize,
        }))
      )
    ));
  };

  return (
    <>
      <ListTabs
        activeTab={activeTab}
        activeChangeHandler={activeChangeHandler}
      />
      <BookShelf
        activeTab={activeTab}
        tier={tier}
        setTier={setTier}
        />
    </>
  );
};
