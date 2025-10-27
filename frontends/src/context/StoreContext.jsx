import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:3000";

  // Add item to cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Add to cart error:", error);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: current - 1 };
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Remove from cart error:", error);
      }
    }
  };

  // Calculate total amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) total += itemInfo.price * cartItems[itemId];
      }
    }
    return total;
  };

  // Fetch food list from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data.data || []);
    } catch (error) {
      console.error("Fetch food list error:", error);
    }
  };

  // Load cart data if token exists
  const loadCartData = async (userToken) => {
    if (!userToken) return;
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCartItems(response.data.cart || {});
    } catch (error) {
      console.error("Load cart data error:", error);
    }
  };

  // On mount: load token, food list, cart
  useEffect(() => {
    const init = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
      await fetchFoodList();
    };
    init();
  }, []);

  const contextValue = useMemo(
    () => ({
      cartItems,
      food_list,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken,
      setCartItems,
    }),
    [cartItems, food_list, token]
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
// import { createContext, useEffect, useState, useMemo } from "react";
// import API from "../api";

// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState({});
//   const [food_list, setFood_list] = useState([]);
//   const [token, setToken] = useState("");

//   // Add to cart
//   const addToCart = async (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
//     }));
//     try {
//       await API.post("/cart/add", { itemId });
//     } catch (err) {
//       console.error("Add to cart error:", err);
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (itemId) => {
//     setCartItems((prev) => {
//       const current = prev[itemId] || 0;
//       if (current <= 1) {
//         const copy = { ...prev };
//         delete copy[itemId];
//         return copy;
//       }
//       return { ...prev, [itemId]: current - 1 };
//     });
//     try {
//       await API.post("/cart/remove", { itemId });
//     } catch (err) {
//       console.error("Remove from cart error:", err);
//     }
//   };

//   // Fetch cart
//   const loadCartData = async () => {
//     try {
//       const { data } = await API.get("/cart/get");
//       setCartItems(data.cart || {});
//     } catch (err) {
//       console.error("Load cart error:", err);
//     }
//   };

//   // Fetch food list
//   const fetchFoodList = async () => {
//     try {
//       const { data } = await API.get("/food/list");
//       setFood_list(data.data || []);
//     } catch (err) {
//       console.error("Fetch food error:", err);
//     }
//   };

//   // Init on mount
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (accessToken && refreshToken) setToken(accessToken);

//     fetchFoodList();
//     loadCartData();
//   }, []);

//   const contextValue = useMemo(
//     () => ({
//       cartItems,
//       food_list,
//       addToCart,
//       removeFromCart,
//       token,
//       setToken,
//       setCartItems,
//     }),
//     [cartItems, food_list, token]
//   );

//   return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
// };

// export default StoreContextProvider;
