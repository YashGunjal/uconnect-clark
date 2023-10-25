import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";
import { SendBulkMail } from "../../helpers/sendbulkmail";
import { encryptPassword } from "../../helpers/passwordEncryption";
import userRoles from "../../constants/userRoles";
import { getTokenObject } from "../../helpers/generateTokenObject";

dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export async function getPosts(req,res) {
  let subjectId = parseInt(req.params["subject_id"]);
  var connection = getConnection();

  const getPostQuery = `
  select p.*, ur.first_name, ur.last_name 
  from public.posts p join public.users ur on p.user_id = ur.id 
  where 
    subject_id =  ${subjectId}  `;

  const getPostRepliesQuery = `
  select pr.* , ur.first_name, ur.last_name 
  from public.post_reply pr join public.users ur on pr.user_id = ur.id
  where 
    pr.post_id in (select id from public.posts where subject_id = ${subjectId})`;

  try {
    const [post, replies] = await Promise.all([
      connection.manager.query(getPostQuery),
      connection.manager.query(getPostRepliesQuery),
    ]);

    let sortedreplies = {}
    replies.forEach(function(reply) {
      if (reply.post_id in sortedreplies){
        sortedreplies[reply.post_id].push(reply)
      }
      else{
        sortedreplies[reply.post_id] = [reply]
      }
    });

    // console.log(post,replies, sortedreplies)
    

    res.json({post,replies:sortedreplies});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Couldn't fetch posts" });
  }
}
