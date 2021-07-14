import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  event: {
    type: Schema.Types.ObjectID,
    ref: "Event",
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  paymentId: { type: String, default: "" },
  bookingTime: { type: Date, default: Date.now() },
  status: {
    type: String,
    enum: ["UNPAID", "PAID"],
    default: "UNPAID",
  },
});

const Payment = new mongoose.model("payment", schema);
export default Payment;
