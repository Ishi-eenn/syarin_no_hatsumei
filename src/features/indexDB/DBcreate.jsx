import { TEST_DATA_BOOKS, TEST_DATA_SHELVE } from "../test/TestData";

export const DB_NAME = 'userDB';
export const DB_VERSION = 2;
export const STORE_NAME_BOOKS = 'books';
export const STORE_NAME_SHELVES = 'shelves'
export const KEY_PATH_BOOKS = 'isbn';
export const KEY_PATH_SHELVES = 'id'


export const DBcreate = () => {


  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = () => {
    //データベースが開けない・初期化できない時のエラー処理実装
    //例：別タブで開いてる場合→404エラーページ
  }

  //新規データ作成
  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const storeBooks = db.createObjectStore(
      STORE_NAME_BOOKS,
      { keyPath: KEY_PATH_BOOKS,  autoIncrement: true }
    );
    const storeShelves = db.createObjectStore(
      STORE_NAME_SHELVES,
      { keyPath: KEY_PATH_SHELVES, autoIncrement: true }
    )


    storeBooks.createIndex(KEY_PATH_BOOKS, KEY_PATH_BOOKS, { unique: true });
    storeShelves.createIndex(KEY_PATH_SHELVES, KEY_PATH_SHELVES, { unique: true } );

    storeBooks.transaction.oncomplete = () => {
      const trans = db.transaction(STORE_NAME_BOOKS, "readwrite");
      const objStore = trans.objectStore(STORE_NAME_BOOKS);
      TEST_DATA_BOOKS.forEach((item) => {
        objStore.add(item);
      });
    };
    storeShelves.transaction.oncomplete = () => {
      const trans = db.transaction(STORE_NAME_SHELVES, "readwrite");
      const objStore = trans.objectStore(STORE_NAME_SHELVES);
      TEST_DATA_SHELVE.forEach((item) => {
        objStore.add(item);
      });
    };
  }

  //接続解除
  request.onsuccess = (event) => {
    const db = event.target.result;
    console.log('db open success');
    db.close();
  }
}
