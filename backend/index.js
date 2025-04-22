const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");

const port = process.env.PORT || 4500;

// create  express app
const app = express();

//create http server passing the express app
const server = http.createServer(app);

// create an io object using Server from socket.io
const io = new Server(server);

server.listen(() => console.log(`The Server is listen at port ${port}`));

