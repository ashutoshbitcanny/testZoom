// const express = require("express");
// const router = express.Router();
const User = require("../models/UserModel");
// const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const axios = require("axios");

const UserController = () => {
  const signup = async (req, res, next) => {
    try {
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          return res.status(400).json({ email: "email already exists" });
        }

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json(user);
              })
              .catch((err) => console.log(err));
          });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const login = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email: email }).then((user) => {
        if (!user) return res.status(404).json({ email: "User not found" });
        bcrypt.compare(password, user.password).then((response) => {
          if (!response)
            return res.status(404).json({ password: "password incorrect" });
          //user matched

          const payload = {
            id: user.id,
            name: user.name,
          }; //create jwt payload

          //sign tocken
          jwt.sign(
            payload,
            process.env.secretKey,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        });
      });
    } catch (error) {
      console.log(error);
      res.status(406).send({
        message: error.message,
      });
    }
  };

  const getMeetings = async (req, res, next) => {
    console.log(req.url);
    try {
      const resData = await axios.get(`${baseUrl}${req.url}`, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  };

  const createMeeting = async (req, res, next) => {
    try {
      const resData = await axios.post(`${baseUrl}${req.url}`, req.body, {
        headers: {
          authorization: `Bearer ${process.env.jwtToken}`,
        },
      });
      res.status(resData.status).send(resData.data);
    } catch (error) {
      res.status(error.response.status).send(error.response.data);
    }
  };
  return {
    signup,
    login,
    getMeetings,
    createMeeting,
  };
};
module.exports = UserController;
