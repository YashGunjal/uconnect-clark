#!/usr/bin/env node
import app from './index.js'
import Config from './config.js'
import { Server } from "socket.io"
import http from 'http'
import dotenv from 'dotenv';
import postHandler from './socket/postHandler.js';
import commentHandler from './socket/commentHandler.js';
dotenv.config();
let allowedOrigin = process.env.ALLOWED_ORIGIN;



const server = http.createServer(app);
const io =  new Server(server,{
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
  }
});

app.set('socketio', io);

const onConnection = (socket) => {
  console.log(`User Connected: ${socket.id}`,);

  postHandler(io, socket);
  commentHandler(io, socket);
}

io.on("connection", onConnection);



server.listen(Config.express.port, Config.express.ip, function (error) {
    if (error) {
      console.log('Unable to listen for connections', error)
      process.exit(10)
    }
    console.log('express is listening on http://' +
    Config.express.ip + ':' + Config.express.port)
  })