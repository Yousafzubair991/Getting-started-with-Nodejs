const express = require("express");
const mongoose = require("mongoose");
const router = express?.Router();
const Student = require("../model/student");

router?.get("/", (req, res, next) => {
  res?.status(200);
  res.send({ message: "GET" });
});

router?.post("/", (req, res, next) => {
  console?.log("Body>>>", req?.body);
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req?.body?.name,
    gender: req?.body?.gender,
    class: req?.body?.class,
    age: req?.body?.age,
    created_at: new Date(),
  });

  student
    ?.save()
    .then((result) => {
      console?.log(result);
      res?.status(201);
      res?.json({ message: "Student created", result: result });
    })
    .catch((err) => {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    });
});

module.exports = router;
