const express = require("express");
const router = express?.Router();

router.get("/", (req, res, next) => {
  res.status(200);
  res.send({ message: "Faculty GET" });
});

router.post("/", (req, res, next) => {
  res.status(200);
  res.send({ message: "Faculty post" });
});

module.exports = router;
