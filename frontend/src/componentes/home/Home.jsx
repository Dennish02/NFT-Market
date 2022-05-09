import React from 'react'
import NavBar from './NavBar'
import SearchBar from './SearchBar'

export default function Home() {
  return (
    <div className='contentHome'>
        <NavBar/>
        <div>
            <SearchBar/>
        </div>
    </div>
  )
}
