import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });

    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "user not found" });

    const key = itemId.toString();

    // Initialize cartData as Map if not present
    if (!user.cartData) user.cartData = new Map();

    // Add or update quantity
    user.cartData.set(key, (user.cartData.get(key) || 0) + 1);

    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: Object.fromEntries(user.cartData) });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ========================
// Remove item from cart
// ========================
const removeFromCart = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ message: "itemId is required" });

    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "user not found" });

    const key = itemId.toString();

    if (user.cartData && user.cartData.has(key)) {
      let qty = user.cartData.get(key) - 1;

      if (qty <= 0) {
        user.cartData.delete(key);
      } else {
        user.cartData.set(key, qty);
      }

      await user.save();
      return res.status(200).json({ message: "Item removed from cart", cart: Object.fromEntries(user.cartData) });
    }

    res.status(400).json({ message: "Item not in cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ========================
// Get cart items
// ========================


// Get Cart Items
// const getCart = async (req, res) => {
//   try {
//      console.log("Decoded user in token:", req.user);
//     const userId = req.user.userId || req.user._id; // handle both cases
//     const userData = await userModel.findById(userId);
//     if (!userData) return res.status(404).json({ message: "User not found" });

//     const cartData = userData.cartData || new Map();
//     res.status(200).json({ cart: Object.fromEntries(cartData) });
//   } catch (error) {
     
//     console.error(error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
   

//   }
// };
const getCart = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "user not found" });

    // Initialize empty Map if not present
    if (!user.cartData) user.cartData = new Map();

    res.status(200).json({ cart: Object.fromEntries(user.cartData) });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};






export { addToCart, removeFromCart, getCart };
