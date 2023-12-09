import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";
import { SendBulkMail } from "../../helpers/sendbulkmail";
import { encryptPassword } from "../../helpers/passwordEncryption";
import userRoles from "../../constants/userRoles";
import { getTokenObject } from "../../helpers/generateTokenObject";
import { User } from "../../db/entity/User";

dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export async function getPosts(req,res) {
  let subjectId = parseInt(req.params["subject_id"]);
  var connection = getConnection();
  const postReplyRepository =connection.getRepository("PostReply");
  const postRepository = connection.getRepository("Post");

    // Create the query
  const getPostQuery = postRepository
  .createQueryBuilder('p')
  .select(['p.*', 'ur.first_name as firstName', 'ur.last_name as LastName'])
  .innerJoin(User, 'ur', 'p.user_id = ur.id')
  .where('p.subject_id = :subjectId', { subjectId });

  const getPostRepliesQuery = postReplyRepository
  .createQueryBuilder('pr')
  .select('pr.*')
  .addSelect('ur.first_name as firstName')
  .addSelect('ur.last_name as LastName')
  .innerJoin(User, 'ur', 'pr.user_id = ur.id')
  .where('pr.post_id IN (SELECT id FROM public.posts WHERE subject_id = :subjectId)', { subjectId: subjectId });

  try {
    const [post, replies] = await Promise.all([
      getPostQuery.getRawMany(),
      getPostRepliesQuery.getRawMany(),
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



export async function addPost(req, res){
  let data = req.body;
  var connection = getConnection();
  const postRepository =connection.getRepository("Post");
  let newPost = { 
    user_id:req.user.id,
    subject_id:data.subjectId,
    content:data.postContent,
  }
  const insertPostQuery = `INSERT INTO public.posts ( "content", "user_id", "subject_id") 
    VALUES ( '${newPost.content}', '${newPost.user_id}', ${newPost.subject_id}) RETURNING "id" `

  try {
    const newPost = await connection.manager.query(insertPostQuery)
    console.log(" new register",newPost);
      
    const getPostQuery = postRepository
    .createQueryBuilder('p')
    .select(['p.*', 'ur.first_name as firstName', 'ur.last_name as LastName'])
    .innerJoin(User, 'ur', 'p.user_id = ur.id')
    .where('p.id = :postId', { postId: newPost[0].id});

    const post = await  getPostQuery.getRawMany()
    // console.log(post)
        
    res.status(200).json({ data: post, message: "success" });
    var io = req.app.get('socketio');
    io.emit("new:post", { data: post, message: "success" });
    
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Couldn't update comment!" });
  }
  
}



/*   Queries used at kept at bottom  for reference

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

*/



