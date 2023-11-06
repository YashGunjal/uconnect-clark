import { getUser } from "../helpers/socketUtils";
import { User } from "../db/entity/User"
import { getConnection } from "typeorm";


export default (io, socket) => {
    const createPost = (payload) => {
        console.log(payload)
        let user  = getUser(payload)
        if (!user){
            return
        }
        console.log(user," fromsocket")

        


      

    //   socket.broadcast.emit("receive_message", data);
    }
  
  
    socket.on("post:create", createPost);
    
  }