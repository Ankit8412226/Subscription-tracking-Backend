import express from "express";
import config from "../config/index.js";
import dbConnect from "../config/dbConnect.js";

const app = express();
const port = config.port;

app.get("/", (req, res) => {
  res.send("Welcome to the subscription Tracker Logic part");
});

dbConnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
