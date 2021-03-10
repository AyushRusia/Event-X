import express from "express";
const app = express();
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./auth/authrouter";
import cors from "cors";
import jwt from "jsonwebtoken";
const PORT = 8000;
const secret = "asdfghjklasdfghjkasdfghjkasdfghasdfghj";
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// app.use(bodyParser.json());

app.use("/auth", router);
app.use("/graphql", async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const verify = await jwt.verify(token, secret);
    req.userId = verify.user;
  }
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers,
  })(req, res);
});
app.listen(PORT, () => console.log(`Server Running On port ${PORT}`));

mongoose
  .connect("mongodb://localhost:27017/graphqlpr", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("databse connected"))
  .catch((e) => console.log(e));
