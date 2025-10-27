
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order
export const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";

  try {
    console.log("Order Body:", req.body);
    console.log("User from JWT:", req.user);

    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized: No userId" });
    if (!req.body.items || req.body.items.length === 0)
      return res.status(400).json({ success: false, message: "No items in order" });

    // Save order in DB
    const newOrder = new OrderModel({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line items
    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, message: "Order failed", error: err.message });
  }
}


 export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.json({ success: true, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "verification failed", error: error.message });
  }
};


//  export const userOrders=async(req,res)=>{
//     try{
//       const orders=await OrderModel.find({userId:req.user.userId});
//       res.json({success:true,orders})
//     }
//     catch(error)
//     {
//       console.error("Error fetching user orders:", error);
//       res.status(500).json({success:false,message:"Failed to fetch orders",error:error.message})

//     }

//  }
export const userOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get All Orders (Admin)
export const listOrders=async(req,res)=>{
  try{
    const orders =await OrderModel.find();
    res.json({success:true,data:orders})

  }
  catch(error)
  {
    console.error("Error fetching all orders:", error);
    res.status(500).json({success:false,message:"Failed to fetch orders",error:error.message})
  }

}
//update order status
export const updateOrderStatus=async(req,res)=>{
  
  try{
    await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Order status updated successfully"})
    
  }
  catch(error)
  {
    console.error("Error updating order status:", error);
    res.status(500).json({success:false,message:"Failed to update order status",error:error.message})
  }
}