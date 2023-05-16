const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { userModel } = require("../model/user.model");

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let newUser = new userModel({
        email,
        password: hash,
      });
      newUser.save();
      res.status(200).send({ msg: "User registered successfully" });
    });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(201).send({
            msg: "Login Successully",
            token: jwt.sign({ userID: user._id }, "mock15"),
          });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(201).send({ msg: "Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { userRouter };
