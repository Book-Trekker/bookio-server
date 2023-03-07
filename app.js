const express = require("express");
const errorHandlerGard = require("./middleware/error");
const path = require("path");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoute");

app.use("/api/v1", user);
app.use("/", (req, res)=> {
    // res.send("Server connection successful")
    res.sendFile(path.join(__dirname, "./Views/index.html"));
});

/* testing api  */
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "./Views/index.html"));
//   });

app.use(errorHandlerGard);

module.exports = app;
