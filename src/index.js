require("babel-core/register");
require("babel-polyfill");
import express from "express";
const app = express();
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import resolvers from "./graphql/resolver.js";
import cookieParser from "cookie-parser";
import router from "./auth/authrouter";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

app.use(cookieParser());
app.use(
  cors({
    origin: [`${process.env.HOST}`],
    credentials: true,
  })
);
app.use(express.json());

// app.use(bodyParser.json());

app.use("/auth", router);
app.use("/graphql", async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const verify = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify.user;
  }
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers,
  })(req, res);
});
app.listen(process.env.PORT || 8000, () =>
  console.log(`Server Running On port ${process.env.PORT || 8000}`)
);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("databse connected"))
  .catch((e) => console.log(e));
