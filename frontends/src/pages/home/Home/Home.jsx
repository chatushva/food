import React, { useState } from 'react'
import './Home.css'
import Header from '../../../components/navbar/Header/Header'
import Menu from '../../../components/navbar/ExploreMenu/Menu'
import FoodDisplay from '../../../components/Fooddisplay/FoodDisplay'
import AppDownload from '../../../components/App-download/AppDownload'

const Home = () => {
  const[category,setCategory]=useState("All")
  return (
    <div>
        <Header/>
        <Menu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home