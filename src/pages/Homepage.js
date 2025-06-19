import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  //儲存使用者在搜尋框輸入的文字。
  let [input, setInput] = useState("");
  // 儲存從 Pexels API 取得的圖片資料（通常是一個陣列）。
  let [data, setData] = useState(null);
  // 目前查詢的分頁頁碼，用於「載入更多」功能。
  let [page, setPage] = useState(1);
  // currentSearch：記錄當前的搜尋關鍵字。
  let [currentSearch, setCurrentSearch] = useState("");
  //金鑰
  const auth = process.env.REACT_APP_API_KEY;
  const initialURL = process.env.REACT_APP_INITIAL_URL;
  let searchURL = process.env.REACT_APP_SEARCH_URL;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  // Closure
  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${
        page + 1
      }`;
    }
    console.log("正在morePicture內部");
    console.log(newURL);
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture}>更多圖片</button>
      </div>
    </div>
  );
};

export default Homepage;
