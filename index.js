const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
require('dotenv').config();
const userRoutes = require("./routes/User")

const URL = "mongodb+srv://admin:admin123@curddapp.qdr3a.mongodb.net/PROJECT_0?retryWrites=true&w=majority";
mongoose.connect(URL,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {console.log("connection success")}).catch((err) => {
    console.log(err.message);
});


const app = express();  
const port = process.env.API_PORT;

app.use(bodyParser.json());

app.all('/', (req, res) => {
    res.send('Hello World, from express');
});

app.use(require("./routes/User"));
// app.use("/user",userRoutes)
app.use(require("./routes/Post"));


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});