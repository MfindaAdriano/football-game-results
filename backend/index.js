const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");

const dbRouter = require('./routers/db.js');


const port = process.env.PORT || 4500;

// create  express app
const app = express();
//create http server passing the express app
const server = http.createServer(app);

// create an io object using Server from socket.io
const io = new Server(server);



server.listen(port, () => console.log(`The Server is listen at port ${port}`));

// middleware
app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    next();
})

app.use("/dbs", dbRouter);

app.get("/", (request, response) => {
    console.log("Hello Universe, from Mfinda");
    response.json({country:"PSG", competition: "deFrance"});
})

app.post("/", (req, res) => {
    console.log("Hello post /")
})


