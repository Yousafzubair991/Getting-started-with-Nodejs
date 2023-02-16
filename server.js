const express = require("express");
const app = express();
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const port = 3000;

app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);

app.use((req, res) => {
  res?.status(404);
  res.send({ error: "BAD REQUEST!" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
