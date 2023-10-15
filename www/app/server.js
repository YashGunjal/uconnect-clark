#!/usr/bin/env node
import app from './index.js'
import Config from './config.js'
import { Server } from "socket.io"
import http from 'http'
import dotenv from 'dotenv';
dotenv.config();
let allowedOrigin = process.env.ALLOWED_ORIGIN;


// const server = app.listen(Config.express.port, Config.express.ip, function (error) {
//   if (error) {
//     console.log('Unable to listen for connections', error)
//     process.exit(10)
//   }
//   console.log('express is listening on http://' +
//   Config.express.ip + ':' + Config.express.port)
// })




const server = http.createServer(app);
const io =  new Server(server,{
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket) => {
    //your code here
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      console.log(data)
      socket.broadcast.emit("receive_message", data);
    });
});

server.listen(Config.express.port, Config.express.ip, function (error) {
    if (error) {
      console.log('Unable to listen for connections', error)
      process.exit(10)
    }
    console.log('express is listening on http://' +
    Config.express.ip + ':' + Config.express.port)
  })