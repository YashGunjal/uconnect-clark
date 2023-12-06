import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  Media,
  Progress,
  Table,
  Collapse,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { PiHandsClappingThin } from "react-icons/pi";
import { FaHandsClapping } from "react-icons/fa6"

import { Capitalize } from "../../../../utilities/StringUtils";
import { dateTimeFormat } from "../../../../utilities/DateTimeUtil";
import { useSelector, useDispatch } from "react-redux";
import AvatarInitials from "../../../../avatarInitials/AvaterInitials";
import TextField from "../../../../components/textField/TextField";
import ToolTip from "../../../../components/toolTip/ToolTip";
import CommentServices from "../../../../../services/CommentSerives";
import { SuccessMessage } from "../../../../components/notification/NotificationHelper";

import { postskey, updateReplyByPost, addLike } from "../PostSlice";
import { subjectskey } from "../../main/SubjectsSlice";

export default function ChatTile({ post }) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [reply, setreply] = useState("");
  const [replies, setReplies] = useState([]);

  const { repliesByPost } = useSelector((state) => {
    return state[postskey];
  });
  const { searchText: givenText } = useSelector((state) => {
    return state[subjectskey];
  });

  subjectskey
  
  useEffect(() => {
    let repliestemp = repliesByPost[post?.id] ?? []
    let arryforsort = [ ...repliestemp]
    arryforsort.sort((a, b) => {
      let x = a?.likes ?? 0
      let y = b?.likes ?? 0
      return x < y ? 1 : -1;
    });
    setReplies(arryforsort);
  }, [repliesByPost]);

  const topicwriterFirstName = post.firstname;
  const topicwriterlastName = post.lastname;
  const createdAt = post.created_at;

  const makeComment = async () => {
    let response = await CommentServices.addCommentTopost({
      postId: post.id,
      comment: reply,
    });
    console.log(" new commnet", response.data);

    // dispatch(updateReplyByPost({ postId: [post.id], comment: response.data }));
    setreply("");
  };

  const toggleCollapse = (e) => {
    setShowComments(!showComments);
  };


  const addlike = async (payload) => {
    let response = await CommentServices.addLikeOnComment(payload);
    if (response?.status == 200) {
      console.log("success, like updated");
      SuccessMessage("Like Added");
    }
    // update happening from socket listener
    // dispatch(addLike({ postId:[post.id], replyId: payload.replyId} ))
  };

  const getHighlightestText = (text) => {
    var searchText = givenText.toLowerCase()

    if (searchText.length > 2){
      var textlength = searchText.length
      var searchString = text.toLowerCase()
      var newString = ""
      var indexes = [];
      var lastfound = 0
      var currIndex = searchString.slice(lastfound).indexOf(searchText)
      var found =  currIndex != -1 ? true : false
      while(found){
          console.log(currIndex !== -1, currIndex != -1) 
          indexes.push(currIndex)
          let  search = searchString.slice(currIndex +1).indexOf(searchText)
          var found =  search != -1 ? true : false
          currIndex = currIndex + search  +1
        }
      var lastIndex = 0
      for (let i = 0; i < indexes.length; i++) {
        const element = indexes[i];
        newString =newString+  text.slice(lastIndex, element) + "<strong style='color:#cf2e2e'>" + text.slice(element, element+ textlength) + "</strong>"
        lastIndex = element + textlength

      }
      newString = newString + text.slice(lastIndex,text.length)
      return newString
    }
      return text

  }

  return (
    <Row className="p-4">
      <Col>
        <Card>
          <CardHeader className="d-flex align-items-center  justify-content-between pt-2 mb-2 text-sm pb-2">
            <div className="d-flex align-items-center ">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <AvatarInitials
                  firstName={topicwriterFirstName}
                  lastName={topicwriterlastName}
                />
              </a>
              <div className="mx-3">
                <a
                  className="text-dark font-weight-600 text-sm"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {Capitalize(topicwriterFirstName) +
                    " " +
                    Capitalize(topicwriterlastName)}
                </a>
                <small className="d-block text-muted">
                  {dateTimeFormat(createdAt)}
                </small>
              </div>
            </div>
            <div className="pointer">
              {showComments ? (
                <FaAngleUp
                  className="text-xl clark-color"
                  onClick={toggleCollapse}
                />
              ) : (
                <FaAngleDown
                  className="text-xl clark-color"
                  onClick={toggleCollapse}
                />
              )}
            </div>
          </CardHeader>

          <CardBody className="pt-2 mb-2 pb-3">
        
             <p className="mb-3 " 
            dangerouslySetInnerHTML={{ __html: getHighlightestText(post.content) }}>
            </p>
             

            <Collapse role="tabpanel" isOpen={showComments}>
              <hr className=" hr-less mt-0" />
              <div className="mb-1">
                {replies == undefined || replies.length == 0 ? (
                  <>
                    <p className="h-3"> No Responses yet!</p>
                  </>
                ) : (
                  <>
                    {replies?.map((reply) => (
                      <Media className="media-comment ml-4">
                        <AvatarInitials
                          firstName={reply.firstname}
                          lastName={reply.lastname}
                        />
                        <Media className="w-100">
                          <div className="media-comment-text ml-2">
                            <h6 className="h5 mt-0">
                              {Capitalize(reply.firstname) +
                                " " +
                                Capitalize(reply?.lastname)}{" "}
                              <small className="d-block text-muted">
                                {dateTimeFormat(reply?.created_at)}
                              </small>
                            </h6>
                            <p className="text-sm lh-160">{reply.content}</p>
                            <div className="icon-actions">
                              <a
                                className="like active"
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addlike({
                                    replyId: reply.id,
                                    likes: reply.likes,
                                  });
                                }}
                              >
                                {/* <i className="fas fa-thumbs-up"></i> */}
                                < FaHandsClapping />
                                {/* <PiHandsClappingThin /> */}
                                <span className="text-muted">
                                  {reply?.likes} likes
                                </span>
                              </a>
                            </div>
                          </div>
                        </Media>
                      </Media>
                    ))}
                  </>
                )}

                <hr className=" hr-less" />
                <Media className="align-items-center">
                  <Media body>
                    <Form className="d-flex  ml-2">
                      <TextField
                        // label={"Email"}
                        placeholder="Write your comment"
                        rows="1"
                        formstyle={{ width: "100%" }}
                        type="textarea"
                        value={reply}
                        onkeydown={(e) => {
                          if (e.key == "Enter" && reply != "") {
                            makeComment();
                          }
                          else{
                            // setreply((previous) => previous + e.key)
                          }
                        }}
                        onChange={(e) => setreply(e.target.value)}
                        // errorMessage={validations.emailError}
                      />
                      {/* <ToolTip
                      id={post.id + "replybutton"}
                      infoText={
                        reply == ""
                          ? "Write comment to post"
                          : "Click to comment"
                      }
                    /> */}
                      <Button
                        color="clark-red"
                        className="btn-icon avatar-lg rounded-circle "
                        id={post.id + "replybutton"}
                        style={{
                          marginLeft: "0.8rem",
                        }}
                        onClick={reply != "" && makeComment}
                       
                      >
                        <span className="btn-inner--icon">
                          <i
                            class="fas fa-chevron-right"
                            style={{
                              fontSize: "30px",
                            }}
                          ></i>
                        </span>
                      </Button>
                    </Form>
                  </Media>
                </Media>
              </div>
            </Collapse>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
