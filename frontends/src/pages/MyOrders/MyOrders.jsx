
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";
// import "./MyOrders.css";

// const MyOrders = () => {
//   const { url, token } = useContext(StoreContext);
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     if (!token) return;

//     try {
//       const res = await axios.post(
//         `${url}/api/order/userorders`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         setOrders(res.data.orders || []);
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [token]);

//   return (
//     <div className="orders-page">
//       <h2 className="orders-heading">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="no-orders">No orders found.</p>
//       ) : (
//         <ul className="orders-list">
//           {orders.map((order) => (
//             <li key={order._id} className="order-card">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p><strong>Amount:</strong> ₹{order.amount}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyOrders;
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h2 className="orders-heading">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Amount:</strong> ₹{order.amount}</p>

              {/* Display order items/details */}
              {order.items && order.items.length > 0 && (
                <div className="order-items">
                  <p><strong>Items:</strong></p>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x {item.quantity} - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;

