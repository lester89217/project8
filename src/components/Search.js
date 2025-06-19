import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    //e.target.value 則是這個元素目前的值，也就是你在輸入框裡打的內容。
    setInput(e.target.value);
  };

  // 新增：處理按下 Enter 鍵
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="search">
      <input
        className="input"
        onChange={inputHandler}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
