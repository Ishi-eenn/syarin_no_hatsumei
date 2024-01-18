import { XMLParser } from "fast-xml-parser";

const FetchData = async (d) => {
  const xp = new XMLParser();

  try {
    const url =
      typeof d === "number"
        ? `https://ndlsearch.ndl.go.jp/api/opensearch?isbn=${d}&cnt=10`
        : `https://ndlsearch.ndl.go.jp/api/opensearch?title=${d}&mediatype=books&cnt=10`;
    const data = await fetch(url);

    if (!data.ok) {
      throw new Error(`Failed to fetch data. Status: ${data.status}`);
    }

    const res = await data.text();
    const jsonData = xp.parse(res);

    if (jsonData.rss.channel["openSearch:totalResults"] === 0) return false;
    // isbn検索→1件取得
    if (typeof d === "number") {
      const item = jsonData.rss.channel.item;
      const isbn = d;
      const bookName =
        item["dc:title"] +
        (item["dcndl:volume"] !== undefined ? item["dcndl:volume"] : "");
      const bookSize =
        item["dc:extent"] !== undefined &&
        parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08 >= 10
          ? parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08
          : 15;
      return [
        {
          isbn,
          bookName,
          bookSize,
        },
      ];

      /* タイトルキーワード検索→複数件配列で取得 */
    } else {
      const items = jsonData.rss.channel.item;

      /* 複数件取得した場合 */
      if (Array.isArray(items)) {
        return items.map((item) => {
          let isbn;

          if (Array.isArray(item["dc:identifier"])) {
            isbn =
              typeof item["dc:identifier"][0] === "number"
                ? item["dc:identifier"][0]
                : parseInt(item["dc:identifier"][0].replace(/[^0-9]/g, ""));
          } else if (item["dc:identifier"]) {
            isbn =
              typeof item["dc:identifier"] === "number"
                ? item["dc:identifier"]
                : parseInt(item["dc:identifier"].replace(/[^0-9]/g, ""));
          } else {
            isbn = 0;
          }

          const bookSize =
            item["dc:extent"] !== undefined &&
            parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08 >= 10
              ? parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08
              : 15;

          const bookName =
            item["dc:title"] +
            (item["dcndl:volume"] !== undefined ? item["dcndl:volume"] : "");

          return {
            isbn,
            bookName,
            bookSize,
          };
        });

        /* 1件のみ取得した場合 */
      } else {
        const item = items;
        let isbn;
        if (Array.isArray(item["dc:identifier"])) {
          isbn =
            typeof item["dc:identifier"][0] === "number"
              ? item["dc:identifier"][0]
              : parseInt(item["dc:identifier"][0].replace(/[^0-9]/g, ""));
        } else if (item["dc:identifier"]) {
          isbn =
            typeof item["dc:identifier"] === "number"
              ? item["dc:identifier"]
              : parseInt(item["dc:identifier"].replace(/[^0-9]/g, ""));
        } else {
          isbn = 0;
        }
        const bookSize =
          item["dc:extent"] !== undefined &&
          parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08 >= 10
            ? parseInt(item["dc:extent"].match(/\d+/)[0], 10) * 0.08
            : 15;

        const bookName =
          item["dc:title"] +
          (item["dcndl:volume"] !== undefined ? item["dcndl:volume"] : "");
        return [
          {
            isbn,
            bookName,
            bookSize,
          },
        ];
      }
    }
  } catch (error) {
    return false;
  }
};

export default FetchData;
