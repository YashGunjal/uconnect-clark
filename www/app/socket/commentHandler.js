export default (io, socket) => {
    const createComment = (payload) => {
      console.log(payload)
      // ...


      socket.broadcast.emit("receive_message", data);
    }
  
  
    socket.on("comment:create", createComment);
    
  }