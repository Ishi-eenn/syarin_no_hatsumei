const FetchData = async(isbn) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const data = await fetch(url);
    const res = await data.json();
    return {
      "title": res.items[0].volumeInfo.title,
      "page": res.items[0].volumeInfo.pageCount,
    };
  };

export default FetchData;