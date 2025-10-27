import React, { useState } from 'react'
import Navbars from './components/navbar/Navbars'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home/Home'
import Place from './pages/home/PlaceOrder/Place'
import Cart from './pages/home/card/Cart'
import Fotter from './components/Fotter/Fotter'
import LogIn from './components/Log-in/LogIn'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
     const [showLogin, setLogin] = useState(false);
  return (
    <>
    {showLogin?<LogIn setLogin={setLogin}/>:<></>}
    <div className='app'>
      <Navbars setLogin={setLogin}/>
  
      <Routes>
         < Route path="/" element={<Home/>} />
         <Route path="/Cart" element={<Cart/>}/>
         <Route path="/order" element={<Place/>}/>
         <Route path="/verify" element={<Verify/>}/>
         <Route path="/myorders" element={<MyOrders/>}/>
         
      </Routes>
    </div>
    <Fotter/>
    </>
  )
}

export default App