const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./Routes/goalRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`.yellow.underline.bold);
});
