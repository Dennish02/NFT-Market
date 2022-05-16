import React from "react";
import { useDispatch } from "react-redux";
import { SearchNFT } from "../../../redux/actions/actionNFT";
export default function SearchBar() {
  const dispatch = useDispatch();
  function onChangeValues(e) {
    // console.log(e.target.value)
    dispatch(SearchNFT(e.target.value));
  }

  return (
    <div className="contentSearchBar">
      <div>
        <input
          type="text"
          placeholder="Enter token id"
          onChange={onChangeValues}
        />
      </div>
      <div className="contentSearchBar-select">
        <div>
          <label htmlFor="popularity">popularity</label>
          <select name="popularity" id="popularity">
            <option value="one">one</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">price</label>
          <select name="price" id="price">
            <option value="top">top</option>
            <option value="down">down</option>
          </select>
        </div>
      </div>
    </div>
  );
}
