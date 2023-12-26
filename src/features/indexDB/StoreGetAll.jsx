import { DB_NAME } from "./DBcreate"
import { Transaction } from "./Transaction";


export const StoreGetAll = (storeName) => {

  const request = indexedDB.open(DB_NAME);
  let getResult = null;

  request.onerror = () => {
    console.log('error')
    // エラー処理実装
  }

  request.onsuccess = (event) => {
    const db = event.target.result;
    const store = Transaction(db, storeName , 'readonly');
    const getReq = store.get();

    getReq.onerror = (event) = {
      
    };

    getReq.onsuccess = (event) => {
      getResult = event.target.result;
      console.log(getResult);
    }
  }


  return data;
}
