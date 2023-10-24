import React from "react";
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

import { FaUser } from "react-icons/fa";

import { BiSolidSend } from "react-icons/bi";
import AvatarInitials from "../../../../avatarInitials/AvaterInitials";

export default function ChatTile() {
  
  const topicstext = "Personal profiles are the perfect way for you to grab theirattention and persuade recruiters to continue reading your CV because you’re telling them from the off exactly why they should hire you.";
  const topicwriterFirstName = "John"
  const topicwriterlastName =  "Snow"

  const replies = [
    {
      firstName: "dhruv",
      lastName: "Savaliya",
      replyText: "reply 1 ",
      replyTime: "9/24 4:21 AM ",
      linkes: "4 ",
    },
    {
      firstName: "dhruv",
      lastName: "Patel",
      replyText:" Cras sit amet nibh libero, in gravida nulla. Nulla velmetus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      replyTime: "10/12 5:35PM ",
      likes: " 5",
    },
    {
      firstName: "Patel",
      lastName:"Shivam ",
      replyText:
        " Cras sit amet nibh libero, in gravida nulla. Nulla velmetus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      replyTime: "10/12 5:35PM ",
      likes: " 5",
    },
  ];

  return (
    <Row className="p-4">
      <Col>
        <Card>
          <CardHeader className="d-flex align-items-center pt-3 mb-2">
            <div className="d-flex align-items-center">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <AvatarInitials firstName={topicwriterFirstName} lastName={topicwriterlastName} />
              </a>
              <div className="mx-3">
                <a
                  className="text-dark font-weight-600 text-sm"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  John Snow
                </a>
                <small className="d-block text-muted">9/21 5:42 PM</small>
              </div>
            </div>
          </CardHeader>
          <CardBody className="pt-2 mb-2">
            <p className="mb-3">{topicstext}</p>
            <hr className=" hr-less" /> 
            <div className="mb-1">
              {replies.map((reply) => (
                <Media className="media-comment ml-4">
                 
                  <AvatarInitials firstName={reply.firstName} lastName={reply.lastName} />
                  <Media  className="w-100">
                    <div className="media-comment-text ml-2">
                      <h6 className="h5 mt-0">
                        {Capitalize(reply.firstName) + " " + Capitalize(reply?.lastName)}{" "}
                        <small className="d-block text-muted">
                          {reply?.replyTime}
                        </small>
                      </h6>

                      <p className="text-sm lh-160">{reply.replyText}</p>
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
