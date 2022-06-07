import React from "react";
import { useDispatch } from "react-redux";
import {
  SearchNFT,
  sort,
  filterNftCategory
} from "../../../redux/actions/actionNFT";

export default function SearchBar({
  selectedSort,
  setSelectedSort,
  paginas,
  setFilterCategory
}) {
  const dispatch = useDispatch();
  function onChangeValues(e) {
    dispatch(SearchNFT(e.target.value));
  }

  function changeSort(e) {
    dispatch(sort(e.target.value));
    setSelectedSort(e.target.value);
    paginas(1);
  }

  function filterByCategory(e){
   dispatch(filterNftCategory(e.target.value))
   setTimeout(()=>{
     paginas(1)
   },750)  
  }

  return (
    <div className="contentSearchBar">
      <div>
        <input
          type="text"
          placeholder="Enter nft #id"
          onChange={onChangeValues}
        />
      </div>
      <div className="contentSearchBar-select">
        <div>
          <select
            name="price"
            id="price"
            onChange={changeSort}
            value={selectedSort}
          >
            <option disabled value="sort">
              Sort
            </option>
            <option value="price_desc">Price: high to low</option>
            <option value="price_asc">Price: low to high</option>
            <option value="ranking_desc">Popularity: high to low</option>
            <option value="ranking_asc">Popularity: low to high</option>
          </select>

          <select name="categories"  onChange={filterByCategory} value={setFilterCategory}>

            <option value="all">Categories</option>
            <option value="anime">Anime</option>
            <option value="gamer">Gamer</option>
            <option value="savage">Savage</option>
            <option value="cyber">Cyber</option>
            <option value="punk">Punk</option>
            <option value="+18">+18</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
