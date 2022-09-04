const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/blogs");
const cors = require("cors");
const app = express();
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/blogs", router); // localhost:5000/blogs

let userName = process.env.ATLAS_USERNAME;
let password = process.env.ATLAS_PASSWORD;
let atlasDbString = `mongodb+srv://${userName}:${password}@blogs.3g3zmcu.mongodb.net/blogs_app`

mongoose
  .connect(atlasDbString, {
    socketTimeoutMS: 100000,
    connectTimeoutMS: 100000,
  })
  .then(() => {
    console.log("Connected to Blogs")
    app.listen(5000);
  })
  .catch((err) => {
    console.log("Connection to Blogs failed")
    process.exit(1)
  });
