import { DB_NAME } from "./DBcreate"


export const StoreGetAll = (storeName) => {

  const request = indexedDB.open(DB_NAME);
  let getResult = null;

  request.onerror = () => {
    console.log('error')
    // エラー処理実装
  }

  request.onsuccess = (event) => {
    const db = event.target.result;
    const trans = db.transaction(storeName, 'readonly');
    const store = trans.objectStore(storeName);
    const getReq = store.get();

    getReq.onerror = (event) = {
      console.log('error', getResult);
    }

    getReq.onsuccess = (event) => {
      getResult = event.target.result;
      console.log(getResult);
    }
  }


  return data;
}
