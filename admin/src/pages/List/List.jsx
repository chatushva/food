import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from "axios"
 import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { UNSAFE_RemixErrorBoundary } from 'react-router-dom';
const List = ({uri}) => {
 
  const [list,setList]=useState([]);
  const fetchList=async ()=>{
    const response=await axios.get(`${uri}/api/food/list`)
  
    if(response.data.success)
    {
      setList(response.data.data)
    }
    else{
      toast.error()
    }
  }
  const removeFood=async (foodId)=>
  {
      const response =await  axios.post(`${uri}/api/food/remove`,{id:foodId})
      await fetchList();
      if(response.data.success)
      {
        toast.success(response.data.success)
      }
      else{
        toast.error("error")
      }
  }
  useEffect(()=>
{
   fetchList();
},[])
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="List-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
  return (
    <div key={index} className="list-table-format">
      <img src={`${uri}/images/` + item.image} alt={item.name} />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>${item.price}</p>
      <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>
    </div>
  )
})}

      </div>
    </div>
  )
}

export default List