import React from 'react'
import Navbar from './components/Navbars/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes ,Route} from 'react-router-dom'
import Order from './pages/Order/Order'
import List from './pages/List/List'
import Add from './pages/Add/Add'
 import { ToastContainer, toast } from 'react-toastify';



const App = () => {
  const uri="http://localhost:3000"
  return (
    <div>
      <ToastContainer />
      <Navbar/>

      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add uri={uri}/>}/>
          <Route path="/list" element={<List uri={uri}/>}/>
          <Route path="/orders" element={<Order uri={uri}/>}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App