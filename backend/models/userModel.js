import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: {
      type: Map,      // Map allows dynamic keys like itemId
      of: Number,     // Each key stores quantity
      default: {},    // Initialize as empty
    },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
