import Event from "../../../models/event";
import User from "../../../models/user";
import Payment from "../../../models/payment"
import { users, events } from "../resolver";

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
            const data = user.bookedEvents;
            const bookeduserid = data.map((data) => {
              return data.event;
            });

            return {
              ...user._doc,
              createdEvents: events.bind(this, user._doc.createdEvents),
              bookedEvents: events.bind(this, bookeduserid),
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
        //extracting clients id
        const data = event.clients;
        const clientuserid = data.map((data) => {
          return data.client;
        });

        return {
          ...event._doc,
          creator: users.bind(this, event._doc.creator),
          clients: users.bind(this, clientuserid),
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
      const bookedEvents = await Event.find({
        _id: { $in: user.bookedEvents },
      });
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
      return clients.map((client) => {
        //user name email phone are there we are extracting payment id booking time
        const payment = await Payment.find({event:Args.EventId,user:client._id});
        console.log(payment);
        //extracted

        const client ={
          _id:client._id,
          name:client.name,
          email:client.email,
          phone:client.phone,
          paymentId:payment.paymentId,
          bookingTime:payment.bookingTime

        }
        
       console.log(client)
       return({...client})
      })
      
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
