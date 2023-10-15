import express from 'express';
import cookieParser from 'cookie-parser';
import glob from 'glob'
import siteRouter from './site/router.js'
import path from 'path';
import { fileURLToPath } from 'node:url';
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import makeConnection from "../app/db/db";
import { getConnection } from 'typeorm';
import { Server } from "socket.io"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
let allowedOrigin = process.env.ALLOWED_ORIGIN;
makeConnection();
let app = express()
app.use(express.json());
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(siteRouter)

// Logic to import all controllers
glob("./api/**/*.routes.js", {}, function (er, files) {
  for (const relControllerPath of files) {
    import(relControllerPath);
  }
})


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.use(express.static('dist'));

// app.use('/api', require('./customers/router'))
// app.use('/api', require('./users/router'))
// // Repeat the above line for additional model areas ("deals", "vehicles", etc)

// // FINALLY, use any error handlers
// app.use(require('./errors/not-found'))

// Export the app instance for unit testing via supertest
export default app;