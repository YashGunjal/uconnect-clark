import jsonwebtoken from "jsonwebtoken";
import { getConnection } from "typeorm";
import dotenv from "dotenv";
import { SendBulkMail } from "../../helpers/sendbulkmail";
import { encryptPassword } from "../../helpers/passwordEncryption";
import userRoles from "../../constants/userRoles";
import { getTokenObject } from "../../helpers/generateTokenObject";
import { PostReply } from "../../db/entity/PostReply";
import { User } from "../../db/entity/User";

dotenv.config();
const secretkey = process.env.TOKEN_SECRET;

export async function addcomment(req, res) {
  let data = req.body;
  var connection = getConnection();
  const postReplyRepository = connection.getRepository("PostReply");
  console.log("user", req.user, data);
  let newComment = {
    user_id: req.user.id,
    post_id: data.postId,
    content: data.comment,
    likes: 0,
  };
  const insertQuery = `INSERT INTO public.post_reply ( "content", "user_id", "post_id", "likes") 
    VALUES ( '${newComment.content}', '${newComment.user_id}', '${newComment.post_id}', ${newComment.likes}) RETURNING "id", "content", "user_id", "likes", "status", "created_at", "updated_at";
     `;

  try {
    const newregistercomment = await connection.manager.query(insertQuery);
    console.log(" new register", newregistercomment);

    const getPostRepliesQuery = postReplyRepository
      .createQueryBuilder("pr")
      .select("pr.*")
      .addSelect("ur.first_name as firstName")
      .addSelect("ur.last_name as LastName")
      .innerJoin(User, "ur", "pr.user_id = ur.id")
      .where("pr.id = :replyId", { replyId: newregistercomment[0].id });
    const reply = await getPostRepliesQuery.getRawMany();
    console.log(reply);

    res.status(200).json({ data: reply, message: "success" });
    var io = req.app.get('socketio');
    io.emit("new:comment", { data: reply, message: "success" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Couldn't update comment!" });
  }
}

export async function addLike(req, res) {
  let data = req.body;
  console.log(data)

  var connection = getConnection();
  const postReplyRepository = connection.getRepository("PostReply");
  
  try {
    // let response = await postReplyRepository.save({id: data.replyId, likes: parseInt(data.likes) + 1},{ updateAllColumns: true })
    const updateResult = await postReplyRepository
    .createQueryBuilder()
    .update(PostReply)
    .set({likes: parseInt(data.likes) + 1})
    .where({id: data.replyId,})
    .returning('*')
    .execute();

    const updatedPostReply = updateResult.raw[0];
    console.log(updatedPostReply," updated reply")
    res.status(200).json({data:updatedPostReply})
    
    var io = req.app.get('socketio');
    io.emit("add:like", updatedPostReply);

  }
  catch(err)
  {
    console.log(err);
    res.status(403).json({ message: "Couldn't update comment!" });
  }







}