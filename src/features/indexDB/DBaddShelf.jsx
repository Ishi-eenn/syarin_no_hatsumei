import { Toast } from "antd-mobile";
import { DB_NAME, STORE_NAME_SHELVES } from "./DBcreate";
import { Transaction } from "./Transaction";


export const DBaddShelf = (props) => {

  const { shelfData } = props;

  const request = indexedDB.open(DB_NAME);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const store = Transaction(db, STORE_NAME_SHELVES, 'readwrite');
    const newRequest = store.put(shelfData);

    newRequest.onsuccess = () => {
      Toast.show({
        icon: 'success',
        content: '追加しました'
      })
    };

  }

  return;
}
