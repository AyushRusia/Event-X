import Event from "../../../models/event";
import User from "../../../models/user";
import Payment from "../../../models/payment";
import bcrypt from "bcryptjs";
import nanoid from "nanoid";
const mutations = {
  createUser: async (Args, req) => {
    try {
      //if (!req.userID) return Error("Unauthorized");
      const tuser = await User.findOne({ email: Args.UserInput.email });
      if (tuser) return Error("email is taken");
      const hashPassword = await bcrypt.hash(Args.UserInput.password, 5);
      const user = await new User({
        name: Args.UserInput.name,
        email: Args.UserInput.email,
        phone: Args.UserInput.phone,
        password: hashPassword,
      });
      const data = await user.save();
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (Args, req) => {
    try {
      console.log(req.userId);
      const event = await new Event({
        title: Args.EventInput.title,
        description: Args.EventInput.description,
        price: Args.EventInput.price,
        creator: req.userId,
      });
      const data = await event.save();
      const user = await User.findById(req.userId);
      await user.createdEvents.push(event);
      await user.updateOne({
        createdEventsCount: user.createdEventsCount++,
      });
      user.save();
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  createOrder: async (Args, req) => {
    try {
      const userId = req.userId;
      if (!userId) return new Error("Unauthorized");

      const event = await Event.findById(Args.EventId);
      if (!event) return new Error("Event does not exist");

      const user = await User.findById(userId);
      if (!user) return new Error("User does not exist");

      const paymentmodel = await new Payment({
        event: Args.EventId,
        user: userId,
        paymentId: await nanoid(),
        status: "PAID",
      });

      await paymentmodel.save();
      return paymentmodel;
    } catch (e) {
      console.log(e);
      return Error(e.data);
    }
  },
  createBooking: async (Args, req) => {
    try {
      const user = await User.findById(req.userId);
      const event = await Event.findById(Args.EventId);
      if (!event) return new Error("Event does not exist");

      const check = event.clients;
      if (check) {
        check.forEach((item) => {
          console.log(item);
          if (item === req.userId);
          throw Error("User already booked Event");
        });
      }

      await event.clients.push({ client: user });
      await event.updateOne({ clientsCount: event.clientsCount++ });
      await user.bookedEvents.push({ event: event });
      await user.updateOne({ boookedEventsCount: user.boookedEventsCount++ });

      await event.save();
      await user.save();

      return event;
    } catch (e) {
      console.log(e);
      return Error(e);
    }
  },
};
export default mutations;
