const express = require("express");
const mongoose = require("mongoose");
const router = express?.Router();
const Student = require("../model/student");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnt451lp3",
  api_key: "239191736114778",
  api_secret: "HETzU5F4s4CK0XI_QMQ-xi_Fr20",
});

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
  const file = req?.files?.image;
  cloudinary.uploader.upload(file?.tempFilePath, (err, result) => {
    if (err) {
      console?.log(err);
      res?.status(500);
      res?.json({ error: err });
    } else {
      const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        name: req?.body?.name,
        gender: req?.body?.gender,
        class: req?.body?.class,
        age: req?.body?.age,
        created_at: new Date(),
        image: result?.url,
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
    }
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
    image: req?.body?.image,
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
