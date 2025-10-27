// import React, { useEffect, useState } from 'react'
// import './Order.css'
// import { toast } from 'react-toastify'
// import axios from "axios"
// import { assets } from '../../assets/assets.js'

// const Order = ({uri}) => {
//   const [Order, setOrder] = useState([]);

//   const fetchAllOrder = async () => {
//     try {
//       const response = await axios.get(url + "/api/order/list");
//       if (response.data.success) {
//         setOrder(response.data.data);
//         console.log(response.data.data);
//       } else {
//         toast.error("error");
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     }
//   }

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(uri + "/api/order/list", {
//         orderId,
//         status: event.target.value
//       });
//       if (response.data.success) { // Fixed typo: Response -> response
//         await fetchAllOrder();
//       }
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   }

//   useEffect(() => {
//     fetchAllOrder();
//   }, []);

//   return (
//     <div className='order add'>
//       <h3> order page</h3>
//       <div className='order-list'>
//         {Order.map((order, idx) => (
//           <div key={order._id || idx} className='order-item'>
//             <img src={assets.parcel_icon} alt="" />
//             <div>
//               <p className='order-tem-food'>
//                 {order.items.map((item, index) => {
//                   if (index === order.items.length - 1) {
//                     return item.name + "x" + item.quantity;
//                   } else {
//                     return item.name + "x" + item.quantity + ",";
//                   }
//                 })}
//               </p>
//               <p className='order-item-name'>
//                 {order.address.firstName + " " + order.address.lastName}
//               </p>
//               <div className='order-item-address'>
//                 <p>{order.address.street + ", "}</p>
//                 <p>
//                   {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
//                 </p>
//               </div>
//               <p className='order-item-phone'>{order.address.phone}</p>
//             </div>
//             <p> Items: {order.items.length}</p>
//             <p>${order.amount}</p>
//             <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
//               <option value='food processing'>food processing</option>
//               <option value='out for delivery'>out for delivery</option>
//               <option value='delivered'>delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Order
import React, { useEffect, useState } from 'react';
import './Order.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets.js';

const Order = ({ uri }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(uri + "/api/order/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // if using token
      });
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(uri + "/api/order/status", {
        orderId,
        status: event.target.value
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        fetchAllOrders();
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order-page'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, idx) => (
          <div key={order._id || idx} className='order-item'>
            <img src={assets.parcel_icon} alt="parcel" />
            <div className='order-details'>
              <p className='order-food'>
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className='order-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className='order-address'>
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
              </div>
              <p className='order-phone'>{order.address.phone}</p>
            </div>
            <p className='order-count'>Items: {order.items.length}</p>
            <p className='order-amount'>₹{order.amount.toFixed(2)}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value='food processing'>Food Processing</option>
              <option value='out for delivery'>Out for Delivery</option>
              <option value='delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
