const express = require("express");
const app = express();
const env = require("dotenv").config();
const router = require("./routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(process.env.PORT, () => {
    return console.log("Server Listening 9000");
  });
  