import Event from "../../models/event";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import mutations from "../graphql/resolvers/mutation";
import queries from "../graphql/resolvers/query";
const users = (userIds) => {
  console.log(userIds);
  return User.find({ _id: { $in: userIds } })
    .then((users) => {
      return users.map((user) => {
        console.log(user);
        //extracting booked events
        const data = user.bookedEvents;
        const bookeduserid = data.map((data) => {
          return data.event;
        });
        return {
          ...user._doc,
          _id: user.id,
          createdEvents: events.bind(this, user._doc.createdEvents),
          bookedEvents: events.bind(this, bookeduserid),
        };
      });
    })

    .catch((e) => console.log(e));
};

const events = (eventIDs) => {
  return Event.find({ _id: { $in: eventIDs } })
    .then((events) => {
      return events.map((event) => {
        //extracting clients id
        const data = event.clients;
        const clientuserid = data.map((data) => {
          return data.client;
        });
        return {
          ...event._doc,
          _id: event.id,
          creator: users.bind(this, event.creator),
          clients: users.bind(this, clientuserid),
        };
      });
    })
    .catch((e) => console.log(e));
};

const resolvers = {
  ...mutations,
  ...queries,
};
export { users, events };
export default resolvers;
