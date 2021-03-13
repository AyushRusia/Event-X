import express from "express";
import UserModel from "../../models/user";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
const secret = "asdfghjklasdfghjkasdfghjkasdfghasdfghj";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      fname,
      lname,
      password,
      phone,
      city,
      college,
      date_of_birth,
    } = req.body;
    console.log(date_of_birth);
    const tuser = await UserModel.findOne({ email });
    if (tuser) return res.status(400).json({ error: "email is taken" });
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await new UserModel({
      name: `${fname} ${lname}`,
      email: email,
      phone: phone,
      password: hashPassword,
      city: city,
      college: college,
      date_of_birth: date_of_birth,
    });
    const data = await user.save();

    res.status(201).json({ id: data._id, email: data.email });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ error: "User Not found" });

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ error: "Password Not Matched" });

    const token = await jwt.sign({ user: user._id }, secret, {
      expiresIn: "7d",
    });
    req.userId = user._id;
    res.cookie("token", token, {});
    res.status(201).json({
      isLoggedIn: true,
      token,
      id: user._id,
      email: user.email,
    });
  } catch (e) {
    //console.log(e);
    res.status(400).json({ error: e });
  }
});

router.get("/logout", async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("Logged Out");
});
router.get("/isloggedIn", async (req, res) => {
  try {
    const token = await req.cookies.token;
    if (!token)
      return res.status(201).json({
        test: "1",
        isLoggedIn: false,
      });

    const verify = await jwt.verify(token, secret);

    const user = await UserModel.findById(verify.user);
    if (!user)
      res.status(201).json({
        test: "2",
        isLoggedIn: false,
      });

    res.status(201).json({
      isLoggedIn: true,
      id: verify.user,
    });
  } catch (e) {
    console.log(e);
    res.json({ test: "3", isLoggedIn: false });
  }
});
export default router;
