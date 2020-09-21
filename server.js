const express = require('express');
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json())

const Instagram = require("./controller/Instagram")
app.use("/",Instagram)

app.listen(8000, () => {
    console.log("server is listening 7000.........")
});