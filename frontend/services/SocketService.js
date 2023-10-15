import socket from "./SocketBase";

var SocketService = {
    sendMessage: function (payload ) {
        
        try {
            socket.emit("send_message",{ ...payload} )
        }
        catch (error) {
            console.error(error);
        }
    },
    receiveMessage: function (setMessages,messages, setCount) {
        return new Promise(function(resolve, reject) {
            try {
                socket.on("receive_message", (data) => {
                // console.log("socket executed")
                console.log("service received messge", data,messages, )
                setMessages((previous) => [...previous, data.message])
                setCount(Math.random())
                resolve(data)
                });  
            }
            catch (error) {
                console.error(error);
            }
        })
    }
}
export default SocketService;



// const api = function() {
//     return new Promise(function(resolve, reject) {
//       socket.emit("ask-for-data");
//       socket.on("get-response", (data) => {
//         resolve(data);
//       })
//     });
//   }
  