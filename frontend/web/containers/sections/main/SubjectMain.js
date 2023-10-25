import React, { useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { DataLoaderKey } from "../../dataloader/DataloaderSlice";
import { useSelector, useDispatch } from "react-redux";

import {
  Alert,
  List,
  Collapse,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "reactstrap";
import CourseList from "../courselist/CouseList";
import ChatWindow from "../chatwindow/ChatWindow";
import BreadCrumb from "../../../components/breadcrum/BreadCrumb";

import { toogleSidePanel,subjectskey } from "./SubjectsSlice";

function SubjectMain({ department }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });
  const { sidePanelOpen } = useSelector((state) => {
    return state[subjectskey];
  });

  const { id, name } = department;
  return (
    <React.Suspense fallback="Loading...">
      <Row className="bg-white">
        <Col className="border pt-2 text-center" xs="3">
          <Button
            color="clark-red "
            id="toggler"
            style={{
              marginBottom: "1rem",
            }}
            onClick={()=> { 
              console.log("dispactching")
              dispatch(toogleSidePanel())
            }
            }
          >
            Show All Courses
          </Button>
        </Col>
        <Col className="border p-2 pl-1 lh-2" xs="9">
          <BreadCrumb items={[name, "MS CS", " Software Engineering"]} />
        </Col>
      </Row>

      <Row className="bg-white">
        <Col className="border" xs={sidePanelOpen ? "3" : ""}>
          <CourseList  />
        </Col>
        <Col className="border pl-0" xs={sidePanelOpen ? "9" : "12"}>
          <ChatWindow />
        </Col>
      </Row>
    </React.Suspense>
  );
}

export default SubjectMain;
