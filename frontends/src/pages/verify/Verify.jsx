
import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import api from '../../axiosInstance';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null); // "success" or "fail"

  const verifyPayment = async () => {
    if (!orderId) {
      console.log("No orderId, redirecting...");
      setPaymentStatus("fail");
      setLoading(false);
      return;
    }

    try {
      // ✅ Fixed syntax for axios.post
      const res = await axios.post(url + "/api/order/verify", { orderId: orderId, success: success });
      console.log("Stripe verify response:", res.data);

      if (res.data.success) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("fail");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setPaymentStatus("fail");
    } finally {
      setLoading(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        if (success === "true" ) {
          navigate("/myorders");
        } else {
          navigate("/home");
        }
      }, 3000);
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="verify">
        <h2>Verifying Payment...</h2>
      </div>
    );
  }

  return (
    <div className="verify">
      {paymentStatus === "success" ? (
        <div>
          <h2>Payment Successful!</h2>
          <p>Your order ID: <b>{orderId}</b></p>
          <p>Redirecting to your orders...</p>
        </div>
      ) : (
        <div>
          <h2>Payment Failed</h2>
          <p>Please try again or contact support.</p>
          <p>Redirecting back to order page...</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
// import React, { useEffect, useContext } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";
// import "./Verify.css";

// const Verify = () => {
//   const [searchParams] = useSearchParams();
//   const orderId = searchParams.get("orderId");
//   const success = searchParams.get("success");
//   const { url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   const verifyPayment = async () => {
//     try {
//       const response = await axios.get(
//         `${url}/api/order/verify?orderId=${orderId}&success=${success}`
//       );

//       if (response.data.success) {
//         navigate("/orders"); // payment success
//       } else {
//         navigate("/home"); // payment failed
//       }
//     } catch (error) {
//       console.error("Verification error:", error);
//       navigate("/home");
//     }
//   };

//   useEffect(() => {
//     if (orderId && success) verifyPayment();
//     else navigate("/home");
//   }, [orderId, success]);

//   return (
//     <div className="verify">
//       <h2>{success === "true" ? "Verifying Payment..." : "Payment Failed"}</h2>
//       <p>Please wait...</p>
//     </div>
//   );
// };

// export default Verify;
