import mongoose, { Schema } from "mongoose";
const user = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    required: true,
  },
  email: {
    type: String,
    default: "",
    required: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  college: {
    type: String,
    default: "",
  },
  date_of_birth: {
    type: Date,
    default: "",
  },

  createdEventsCount: {
    type: Number,
    default: 0,
  },
  boookedEventsCount: {
    type: Number,
    default: 0,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      // title: { type: String, ref: "Event" },
    },
  ],
  bookedEvents: [
    {
      event: {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
      bookingTime: {
        type: Date,
        default: Date.now(),
      },
      paymentId: {
        type: String,
        default: "",
      },
    },
  ],
  time: { type: Date, default: new Date().getTime() },
});
module.exports = mongoose.model("User", user);
