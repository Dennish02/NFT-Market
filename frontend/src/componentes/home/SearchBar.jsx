import React from "react";
import { useDispatch} from "react-redux";
import { SearchNFT, sort } from "../../../redux/actions/actionNFT";
import { useState } from "react";

export default function SearchBar({setOrden}) {

  const dispatch = useDispatch();
  function onChangeValues(e) {
    // console.log(e.target.value)
    dispatch(SearchNFT(e.target.value));
  }

  function changeSort(e) {
    dispatch(sort(e.target.value))
    setOrden(`Ordenado ${e.target.value}`)
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
          <select name="price" id="price" onChange={changeSort}>
            <option value="price_desc">high to low</option>
            <option value="price_asc">low to high</option>
          </select>
        </div>
      </div>
    </div>
  );
}
