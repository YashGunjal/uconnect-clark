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
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import { Capitalize } from "../../../../utilities/StringUtils";
import { dateTimeFormat } from "../../../../utilities/DateTimeUtil";
import { useSelector } from "react-redux";
import AvatarInitials from "../../../../avatarInitials/AvaterInitials";
import { postskey } from "../PostSlice";

export default function ChatTile({ post }) {
  const [replies, setReplies] = useState([]);

  const { repliesByPost } = useSelector((state) => {
    return state[postskey];
  });
  console.log(replies, " replies");
  useEffect(() => {
    setReplies(repliesByPost[post?.id]);
  }, [repliesByPost]);

  const topicstext = post.content;
  const topicwriterFirstName = post.first_name;
  const topicwriterlastName = post.last_name;
  const createdAt = post.created_at;

  console.log("to render");

  return (
    <Row className="p-4">
      <Col>
        <Card>
          <CardHeader className="d-flex align-items-center pt-3 mb-2">
            <div className="d-flex align-items-center">
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
                  {topicwriterFirstName + " " + topicwriterlastName}
                </a>
                <small className="d-block text-muted">
                  {dateTimeFormat(createdAt)}
                </small>
              </div>
            </div>
          </CardHeader>
          <CardBody className="pt-2 mb-2">
            <p className="mb-3">{topicstext}</p>
            <hr className=" hr-less" />
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
                        firstName={reply.first_name}
                        lastName={reply.last_name}
                      />
                      <Media className="w-100">
                        <div className="media-comment-text ml-2">
                          <h6 className="h5 mt-0">
                            {Capitalize(reply.first_name) +
                              " " +
                              Capitalize(reply?.last_name)}{" "}
                            <small className="d-block text-muted">
                              {dateTimeFormat(reply?.created_at)}
                            </small>
                          </h6>

                          <p className="text-sm lh-160">{reply.content}</p>
                          <div className="icon-actions">
                            <a
                              className="like active"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-thumbs-up"></i>
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

              <hr />
              <Media className="align-items-center">
                {/* <FaUser className="avatar avatar-lg rounded-circle mr-4" /> */}
                <Media body>
                  <Form className="d-flex  ml-2">
                    <Input
                      placeholder="Write your comment"
                      rows="1"
                      type="textarea"
                    />
                    <Button
                      color="clark-red"
                      className="btn-icon avatar-lg rounded-circle "
                      id="toggler"
                      style={{
                        marginLeft: "0.8rem",
                      }}
                    >
                      <span className="btn-inner--icon">
                        <i
                          class="fas fa-chevron-right"
                          // <i className="fas fa-chevron-circle-right"
                          style={{
                            fontSize: "30px",
                            // transform: "translate(-8px, 0px)"
                          }}
                        ></i>
                      </span>
                    </Button>
                  </Form>
                </Media>
              </Media>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
