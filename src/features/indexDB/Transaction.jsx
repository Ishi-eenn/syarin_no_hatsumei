
export const Transaction = (props) => {

  const { db, storeName, processName } = props;

  const trans = db.transaction(storeName, processName);
  

  trans.oncomplete = (event) => {
    console.log('transaction start');
    console.log(event.target.result);
  }

  trans.onerror = () => {
    console.log('transaction error');
  }

  const store = trans.objectStore(storeName);

  return store;
}
