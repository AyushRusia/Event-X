import { buildSchema } from "graphql";

const schema = buildSchema(`
type bookedEvents{
    _id:ID
    event:Event!
    paymentId:String
    bookingTime:String
}
type User {
    _id:ID
    name:String
    email:String
    phone:String
    password:String
    city:String
    college:String
    date_of_birth:String
    createdEventsCount:Int
    bookedEventsCount:Int
    createdEvents:[Event!]
    bookedEvents:[bookedEvents]!
}

type Event {
    
    _id:ID
    title:String!
    description:String
    price:String
    city:String
    host:String
    date:String
    clientsCount:Int
    creator:[User!]
    clients:[User!]
}
type Client {
    _id:ID
    name:String
    phone:String
    email:String
    paymentId:ID
    bookingTime:String
}
type Payment{

    _id:ID
    event:ID
    user:ID
    paymentId:String
    bookingTime:String

}
type RootQuery {
    getAllUser:[User!]
    getAllEvent:[Event!]
    getUserDetails:User!
    getClients(EventId:ID):[Client]
    getEligibleEvents:[Event!]
}

input UserInput{

    name:String!
    email:String!
    password:String!
    phone:String

}

 input EventInput{
    title:String!
    description:String
    price:Float!
    city:String
    host:String
    date:String
    

 }
input BookingInput{
    EventId:ID
    paymentId:String
}
input updateUserInput{
    name:String!
    phone:String!
    password:String
    city:String
    college:String
    date_of_birth:String

}
 type RootMutation {
     createUser(UserInput:UserInput):User
     createEvent(EventInput:EventInput):Event
     payOrder(EventId:ID):Payment
     createBooking(BookingInput:BookingInput):Event
     deleteBooking(EventId:ID):Event
     updateProfile(updateUserInput:updateUserInput):User
 }
 schema{
    query:RootQuery
    mutation:RootMutation
 }

`);
export default schema;
