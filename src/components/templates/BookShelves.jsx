import { BookShelf } from "./BookShelf";

export const BookShelves = (props) => {

    const { activeTab, shelves } = props;

    return (
      <>
        <BookShelf shelfData={shelves[activeTab]} />
      </>
  )
}
