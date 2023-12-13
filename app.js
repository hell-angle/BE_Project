const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

app.use(
  cors({
    origin: ['https://chatboxproject-hell-angle.vercel.app'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const admin = require("./routes/admin");
app.use("/admin", admin);
// Adjusted CORS middleware
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://chatboxproject-hell-angle.vercel.app'); // Set the allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server: " + err);
  } else {
    console.log("Listening on http://localhost:8000");
  }
});
