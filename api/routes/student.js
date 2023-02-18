const express = require("express");
const mongoose = require("mongoose");
const router = express?.Router();
const Student = require("../model/student");

//////////////////////GET ALL STUDENTS////////////////////////
router?.get("/", (req, res, next) => {
  Student?.find()
    .then((result) => {
      console?.log(result);
      res?.status(200);
      res?.json({ result: result });
    })
    .catch((err) => {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    });
});
//////////////////////GET STUDENT BY ID////////////////////////
router?.get("/:studentId", (req, res, next) => {
  const id = req?.params?.studentId;
  Student?.findById(id)
    .then((result) => {
      console?.log(result);
      res?.status(200);
      res?.json({ result: result });
    })
    .catch((err) => {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    });
});

//////////////////////CREATE STUDENT////////////////////////
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

//////////////////////DELETE STUDENT////////////////////////
router?.delete("/:studentId", (req, res, next) => {
  const id = req?.params?.studentId;
  Student?.remove({ _id: id })

    .then((result) => {
      console?.log(result);
      res?.status(200);
      res?.json({ message: "Student deleted", result: result });
    })
    .catch((err) => {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    });
});

//////////////////////UPDATE STUDENT////////////////////////
router?.put("/:studentId", (req, res, next) => {
  const id = req?.params?.studentId;
  const updateOps = {
    name: req?.body?.name,
    gender: req?.body?.gender,
    class: req?.body?.class,
    age: req?.body?.age,
    created_at: new Date(),
  };

  Student?.update({ _id: id }, { $set: updateOps })

    .then((result) => {
      console?.log(result);
      res?.status(200);
      res?.json({ message: "Student updated", result: result });
    })
    .catch((err) => {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    });
});

module.exports = router;
