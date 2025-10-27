// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   status: { type: String, default: "pending" },       // pending | paid | failed
//   date: { type: Date, default: Date.now },
//   paymentMethod: { type: String, default: "cash on delivery" },
//   paymentStatus: { type: String, default: "unpaid" }  // unpaid | paid | failed
// });

// const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
// export default OrderModel;
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "pending" },       // pending | paid | failed
  date: { type: Date, default: Date.now },
 payment:{type:Boolean,default:false} // unpaid | paid | failed
});

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default OrderModel;
