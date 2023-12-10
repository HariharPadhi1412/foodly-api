const User = require("../models/User");
const Crypto = require("crypto-js");
const JWT = require("jsonwebtoken");
const admin = require("firebase-admin");

module.exports = {
  createUser: async (req, res) => {
    const user = req.body;

    try {
      await admin.auth().getUserByEmail(user.email);
      res.status(400).json({
        message: "Email already Exists. Please try with another email",
      });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        try {
          const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false,
          });

          console.log(userResponse.uid);

          const newUser = new User({
            username: user.username,
            email: user.email,
            password: Crypto.AES.encrypt(
              user.password,
              process.env.SECRET
            ).toString(),
            uid: userResponse.uid,
            userType: "Client",
          });

          await newUser.save();

          res.status(201).json({ message: "new user created", status: true });
        } catch (error) {
          res.status(500).json({
            status: false,
            error: error.message + "Error creating a new user",
          });
        }
      }
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne(
        { email: req.body.email },
        { __v: 0, createdAt: 0, updatedAt: 0 }
      );

      !user &&
        res.status(401).json({ message: "Wrong Credentials Email is wrong" });

      const decryptedPassword = Crypto.AES.decrypt(
        user.password,
        process.env.SECRET
      ).toString(Crypto.enc.Utf8);

      decryptedPassword !== req.body.password &&
        res.status(401).json({ message: "Wrong Password" });

      const usrToken = JWT.sign(
        {
          id: user._id,
          userType: user.userType,
          email: user.email,
        },
        process.env.JWT_SEC,
        { expiresIn: "5d" }
      );

      const { password, email, ...others } = user._doc;

      res.status(200).json({ ...others, usrToken });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message + "\t No user found",
      });
    }
  },
};
