// import React, { useContext,useState } from 'react'
// import './Place.css'
// import { StoreContext } from '../../../context/StoreContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Place = () => {
//   const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
//   const [data,setData]=useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     zipcode:"",
//     country:"",
//     phone:""
//   })
//   const onChangeHandler=(e)=>{
//     const name=e.target.name;
//     const value=e.target.value;
//     setData(data=>({...data,[name]:value}))
//   }
//   const order= async(event)=>
//   {
//     event.preventDefault();
//     let orderItems=[];
//     food_list.map((item)=>
//     {
//       if(cartItems[item._id]>0)
//       {
//         let itemInfo=item;
//         itemInfo["quantity"]=cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     })
//     let orderData={
//       address:data,
//       items:orderItems,
//       amount:getTotalCartAmount()+2,
//       // userId:token ? JSON.parse(atob(token.split('.')[1])).id : undefined // decode userId from JWT

//   }
//   let response=await axios.post(url+"/api/order/place",orderData,{headers:{Authorization:`Bearer ${token}`}})
//   if(response.data.success)
//   {
//     const {session_url}=response.data;
//     window.location.replace(session_url);
//   }
//   else{
//     alert("order failed")
//   }
// }

//   // const navigate=useNavigate()
//   return (
//     <form onSubmit={order} action="" className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery information</p>
//         <div className="multifields">
//           <input required  name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name' />
//           <input  required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='last name' />
//         </div>
//         <input  required  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
//         <input  required  name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
//         <div className="multifields">
//           <input  required  name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
//           <input  required  name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='state' />
//         </div>
//         <div className="multifields">
//           <input  required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zipcode' />
//           <input  required  name='country' onChange={onChangeHandler} value={data.country}type="text" placeholder='Country' />
//         </div>
//         <input  required  name="phone" type="tel" value={data.phone} onChange={onChangeHandler} placeholder='phone' />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-buttom">
//           <div className="cart-total">
//             <h2>cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>subtotal</p>
//                 <p>{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery fees</p>
//                 <p>${getTotalCartAmount()===0?0:2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//               </div>
//               <hr />
//             </div>
//             <button type='submit'  >PROCEED TO PAYMENT</button>
//           </div>
//         </div>
//       </div>
//     </form>
//   )
// }
// export default Place
import React, { useContext, useState } from 'react';
import './Place.css';
import { StoreContext } from '../../../context/StoreContext';
 import axios from 'axios';


const Place = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const order = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach(item => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // add delivery fee
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        
        window.location.replace(response.data.url);
      } else {
        alert("Order failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Order API error:", error.response?.data || error.message);
      alert("Something went wrong while placing the order");
    }
  }

  return (
    <form onSubmit={order} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multifields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multifields">
          <input required name="city" onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multifields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder='Zipcode' />
          <input required name="country" onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-buttom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fees</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Place;
