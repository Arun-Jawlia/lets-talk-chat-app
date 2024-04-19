const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const app = express();
const port = 8001;
const cors = require("cors");
app.use(express.json())
app.use(cors('*'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const UserModel = require("./Model/User.model");

mongoose
  .connect(
    `mongodb+srv://arunjawlia:arunjawlia1998@lets-connect.bkvpf9k.mongodb.net/?retryWrites=true&w=majority&appName=lets-connect`
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting with DB");
  });

app.listen(port, () => {
  console.log("Server is running");
});

// Register

app.post("/api/user/register", async (req, res) => {
  const { email, name, image } = req.body;
  const userPresent = await UserModel.findOne({ email: email });
  if (userPresent) {
    return res.status(404).json({ message: "Email is already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserModel({
    email,
    name,
    password: hashed_password,
    image,
  });

  await newUser.save();
  res.status(200).json({ message: "User registered successfully" });
})

// Login
app.post("/api/user/login", async (req, res) => {
 try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
      if (!checkPassword) {
        return res.status(401).json({ message: "Wrong Credentials" });
      } else {
        const access_token = jwt.sign({ id: user._id }, 'jawlia');
        res
          .status(200)
          .json({ message: "Login Successfull", token: access_token });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
 } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
 }
});
