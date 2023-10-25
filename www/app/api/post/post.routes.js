import appRouter from "../../site/appRouter.js";
import { verifyToken } from "../auth/auth.controller.js";
import { getPosts } from  "./post.controller.js"

console.log( "added posts")
appRouter.addGetController("/v1/post/get/:subject_id", verifyToken, getPosts);



// appRouter.addPostController("/login", login);





