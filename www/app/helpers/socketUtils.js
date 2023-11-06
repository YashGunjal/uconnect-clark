export async function getUser(payload) {
  const authHeader = payload.headers["authorization"];
  let userdetails = null
  if (authHeader) {
    const token = authHeader && authHeader.split(" ")[1].replace(/\"/g, "");
    jsonwebtoken.verify(token, secretkey, (err, user) => {
      console.log("user after verify fromsocket", user, err);
      if (err){
        return null
      }
      userdetails = user
      
    });
  }
  return userdetails
}
