import mongoose, { Schema } from "mongoose";

const event = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: "",
  },
  city: { type: String, default: "" },
  host: { type: String, default: "" },
  date: { type: String },

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clientsCount: {
    type: Number,
    default: 0,
  },
  clients: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", event);
