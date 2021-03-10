import Event from "../../../models/event";
import User from "../../../models/user";
import Payment from "../../../models/payment";
import { users, events, userbookedEvents } from "../resolver";

const queries = {
  //for admin purpose
  getAllUser: (Args, req) => {
    // if (!req.admin) return Error("JAake Phele Admin bano");
    return (
      User.find()
        //.populate("createdEvents")
        .then((users) => {
          return users.map((user) => {
            //extracting booked events

            return {
              ...user._doc,
              createdEvents: events.bind(this, user._doc.createdEvents),
              bookedEvents: userbookedEvents.bind(this, user._doc._id),
            };
          });
        })
        .catch((e) => console.log(e))
    );
  },

  //for admin purpose
  getAllEvent: async () => {
    try {
      //if (!req.admin) return Error("JAake Phele Admin bano");
      const tevents = await Event.find();
      return tevents.map((event) => {
        return {
          ...event._doc,
          creator: users.bind(this, event._doc.creator),
          clients: users.bind(this, event._doc.clients),
        };
      });
    } catch (e) {
      console.log(e);
    }
    //.populate("creator")
    // .then((events) => {
    //   return events.map((event) => {
    //     return {
    //       ...event._doc,
    //       creator: users.bind(this, event._doc.creator),
    //       clients: users.bind(this, event._doc.clients),
    //     };
    //   });
    // })
    //.catch((e) => console.log(e))
    //);
  },
  //conteext-type
  getUserDetails: async (Args, req) => {
    try {
      const userId = req.userId;
      if (!userId) return new Error("Unathorized");

      const user = await User.findById(userId);
      const createdEvents = await Event.find({
        _id: { $in: user.createdEvents },
      });
      const bookedEvents = await userbookedEvents(userId);
      return {
        ...user._doc,
        createdEvents: createdEvents,
        bookedEvents: bookedEvents,
      };
    } catch (e) {
      return Error(e.data);
    }
  },
  getClients: async (Args, req) => {
    try {
      const userId = req.userId;
      if (!userId) return new Error("Unathorized");
      //validating
      const event = await Event.findById(Args.EventId);
      if (event.creator != userId)
        return new Error("You are not creator of this event");

      const clients = await User.find({ _id: { $in: event.clients } });
      return clients.map(async (client) => {
        //user name email phone are there we are extracting payment id booking time
        const payment = await Payment.findOne({
          event: Args.EventId,
          user: client._id,
        });

        //extracted

        const clientData = {
          _id: client._id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          paymentId: payment.paymentId,
          bookingTime: payment.bookingTime,
        };

        return { ...clientData };
      });
    } catch (e) {
      console.log(e);
      return Error(e.data);
    }
  },
  getEligibleEvents: async (Args, req) => {
    try {
      const userId = req.userId;

      const allevents = await Event.find();

      const eligibleEvents = allevents.filter((event) => {
        var bool = 0;
        const check = event.clients;
        check.forEach((element) => {
          if (element == userId) {
            bool = 1;
          }
        });

        if (bool == 1) return null;
        //if(event.creator!==userId) <- this can also be done
        else {
          return {
            event,
          };
        }
      });
      return eligibleEvents.map((event) => {
        return {
          ...event._doc,
          creator: users.bind(this, event._doc.creator),
        };
      });
    } catch (e) {
      console.log(e);
    }
  },
};

export default queries;
