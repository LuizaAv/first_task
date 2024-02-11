import { useState } from "react";
import "./search.css";

export default function Search({cb}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputCHange = (e) => {
    cb(e.target.value)
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    cb(inputValue)
    setInputValue("")
  }

  const handleEnter = (e) => {
    if(e.key === "Enter"){
      cb(inputValue)
      setInputValue("")
    }
  }

  return (
    <div id="searchContainer">
      <input
        placeholder="   search here"
        id = "searchInput"
        onChange={handleInputCHange}
        onKeyDown={handleEnter}
        value={inputValue}
      ></input>
      <button id = "searchButton" onClick={handleClick}>Search</button>
    </div>
  );
}
