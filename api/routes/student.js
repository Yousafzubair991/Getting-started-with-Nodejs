const express = require("express");
const router = express?.Router();

router?.get("/", (req, res, next) => {
  res?.status(200);
  res.send({ message: "GET" });
});

router?.post("/", (req, res, next) => {
  res?.status(200);
  res.send({ message: "POST" });
});

module.exports = router;
