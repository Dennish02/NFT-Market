import React from "react";
import { useDispatch} from "react-redux";
import { SearchNFT, sort, sortPopularity } from "../../../redux/actions/actionNFT";
import { useState } from "react";

export default function SearchBar({setOrden, selectedSort, setSelectedSort, paginas, OrderPop}) {

  const dispatch = useDispatch();
  function onChangeValues(e) {
    // console.log(e.target.value)
    dispatch(SearchNFT(e.target.value));
  }

  function changeSort(e) {
    //comentario para poder comitear
    dispatch(sort(e.target.value))
    setOrden(`Ordenado ${e.target.value}`)
    setSelectedSort(e.target.value)
    paginas(1)
  }
  function sortByPopularity(e){
    dispatch(sortPopularity(e.target.value))
    OrderPop(`wasu wasol ${e.target.value}`)
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
        {/* <div>
          <label htmlFor="popularity">popularity</label>
          <select onChange={(e)=>sortByPopularity(e)}  id="popularity">
            <option value="high">high</option>
            <option value="low">low</option>
          </select>
        </div> */}
        <div>
          {/* <label htmlFor="price">price</label> */}
          <select name="price" id="price" onChange={changeSort} value={selectedSort}>
            <option disabled value="sort">Sort</option>
            <option value="price_desc">Price: high to low</option>
            <option value="price_asc">Price: low to high</option>
            <option value="ranking_desc">Popularity: high to low</option>
            <option value="ranking_asc">Popularity: low to high</option>
          </select>
        </div>
      </div>
    </div>
  );
}
