import { createConnection } from "typeorm";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

//entities
import { User } from "./entity/User";
import { UserRoles } from "./entity/UserRoles";
import { Post } from "./entity/Post";
import { Chat } from "./entity/Chat";
import { Department } from "./entity/Department";
import { Course } from "./entity/Course";
import { Subject } from "./entity/Subject";
import { PostReply } from "./entity/PostReply"

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

var db_config = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync(__dirname +'/ca-certificate.crt').toString(),
  },
  entities: [
    User,
    UserRoles,
    Post,
    Chat,
    Department,
    Course,
    Subject,
    PostReply,
  ],
};

export default function makeConnection() {
  createConnection(db_config).then(async (connection) => {
    if (!connection.isConnected) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("DB connected!", connection.isConnected);
      await connection.synchronize();
    }
  });
}
