import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allNftMarket } from '../../redux/actions/actionNFT';
import NavBar from '../componentes/home/NavBar'
import SearchBar from '../componentes/home/SearchBar'

export default function Home() {
  const dispatch= useDispatch()
  const allNFT = useSelector(state=> state.allNFT)
  useEffect(()=>{
      dispatch(allNftMarket())
  },[])


  return (
    <div className='contentHome'>
        <NavBar/>
        <div>
            <SearchBar/>
        </div>
    </div>
  )
}
