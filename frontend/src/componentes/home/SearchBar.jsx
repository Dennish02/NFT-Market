import React from 'react'

export default function SearchBar() {
  return (
    <div className='contentSearchBar'>
        <div>
        <input type="text" placeholder='Enter token id'/>
        </div>
        <div className='contentSearchBar-select'>
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
  )
}
