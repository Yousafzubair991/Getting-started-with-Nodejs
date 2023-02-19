const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const userRoute = require("./api/routes/user");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);
app.use("/user", userRoute);

mongoose.connect(
  "<connection URL here>" //enter your connection URL here
);
mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to database", err);
});

app.use((req, res) => {
  res?.status(404);
  res.send({ error: "BAD REQUEST!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
