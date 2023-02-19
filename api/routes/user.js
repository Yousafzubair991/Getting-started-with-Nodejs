const express = require("express");
const mongoose = require("mongoose");
const jsonWebToken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express?.Router();
const User = require("../model/user");

//////////////////////GET ALL USERS////////////////////////
router?.get("/", (req, res, next) => {
  User?.find()
    .then((result) => {
      res?.status(200)?.json({ count: result?.length, result: result });
    })
    .catch((err) => {
      res?.status(500)?.json({ error: err });
    });
});

//////////////////////REGISTER USER////////////////////////
router?.post("/signup", (req, res, next) => {
  const { name, email, phone, password } = req?.body;
  if (!name || !email || !phone || !password) {
    return res?.status(400).json({ error: "Please enter all fields" });
  }
  User?.find({ email: email }).then((result) => {
    if (result?.length > 0) {
      return res
        ?.status(400)
        .json({ error: "User with this email already exists" });
    } else {
      bcrypt?.hash(req?.body?.password, 10, (err, hash) => {
        if (err) {
          return res?.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req?.body?.name,
            email: req?.body?.email,
            phone: req?.body?.phone,
            password: hash,
            created_at: new Date(),
          });
          user
            ?.save()
            .then((result) => {
              res?.status(201);
              res?.json({ message: "User created", result: result });
            })
            .catch((err) => {
              res?.status(500);
              res?.json({ error: err });
            });
        }
      });
    }
  });
});

//////////////////////////////LOGIN/////////////////////
router?.post("/signin", (req, res, next) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    return res?.status(400).json({ error: "Email and password are required!" });
  }
  User?.find({ email: email })
    .exec()
    .then((user) => {
      if (user?.length < 1) {
        return res?.status(401)?.json({ error: "User not found" });
      }
      bcrypt?.compare(password, user[0]?.password, (err, result) => {
        if (!result) {
          return res?.status(401).json({ error: "Incorrect password" });
        }
        if (result) {
          const token = jsonWebToken?.sign(
            {
              name: user[0]?.name,
              email: user[0]?.email,
              phone: user[0]?.phone,
              created_at: user[0]?.created_at,
            },
            "secretKeyy",
            {
              expiresIn: "24h",
            }
          );
          res?.status(200)?.json({
            name: user[0]?.name,
            email: user[0]?.email,
            phone: user[0]?.phone,
            created_at: user[0]?.created_at,
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res?.status(500);
      res?.json({ error: err });
    });
});

//////////////////////////////DELETE USER/////////////////////
router?.delete("/deleteUser/:id", (req, res, next) => {
  const userId = req?.params?.id;
  User?.deleteOne({ _id: userId })
    .then((result) => {
      if (result?.deletedCount > 0) {
        return res
          ?.status(200)
          ?.json({ result: "success", message: "Removed User." });
      } else {
        return res
          ?.status(400)
          ?.json({ result: "failure", message: "No User Found" });
      }
    })
    .catch((err) => {
      res?.status(500);
      res?.json({ error: err });
    });
});
module.exports = router;
