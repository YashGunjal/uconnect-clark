import React, { Component, useCallback, useState } from "react";
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
  Container,
  Col,
  Row,
} from "reactstrap";
import CourseList from "../courselist/CouseList";
import ChatWindow from "../chatwindow/ChatWindow";
import BreadCrumb from "../../../components/breadcrum/BreadCrumb";

import { toogleSidePanel, subjectskey } from "./SubjectsSlice";
import TextField from "../../../components/textField/TextField";
import SearchBox from "./searchbox/SearchBox";

function SubjectMain({ department }) {
  const dispatch = useDispatch();
  const { user, screenDimension } = useSelector((state) => {
    return state[appLoaderKey];
  });
  const { sidePanelOpen, selectedSubjectName, selectCourseObject, selectedSubject } = useSelector((state) => {
    return state[subjectskey];
  });

  const navbarHeight = document.getElementById("navbar-main").clientHeight;
  const { id, name } = department;


  const getBreadCrumbList = useCallback(() => {
    if (selectedSubject ==  null){
      return  [ name ]
    }
    else{
      return  [ name, selectCourseObject?.name, selectedSubjectName ]
    }
  },[selectedSubject] )

  let smallScreen = screenDimension.width < 768
  let courseListTop = smallScreen ? 67 : 0

  return (
    <React.Suspense fallback="Loading...">
      <Container
        style={{
          maxWidth: "1440px",
          height: screenDimension.height - navbarHeight - 3,
          overflow:"clip scroll",
          position: "relative"
        }}
        className="bg-white w-100"
      >
        <Row >
          <Col md="3" xs="12">
            {/* Left column, 1/4 of the screen on medium and larger screens, and full width on smaller screens */}
            <div className="pt-2 text-center sticky-top bg-white" >
              { smallScreen && <Button
                color="clark-red "
                id="toggler"
                style={{
                  marginBottom: "1rem",
                }}
                onClick={() => {
                  console.log("dispactching");
                  dispatch(toogleSidePanel());
                }}
              >
                {sidePanelOpen ? "Hide Course List" : "Show All Courses"}
              </Button>}
            </div>
            <div className="sticky-top" style={{top: courseListTop}}>
              <CourseList height={ (screenDimension.height - navbarHeight - 37) - courseListTop } />
            </div>
          </Col>
          <Col md="9" xs="12">
            {/* Right column, 3/4 of the screen on medium and larger screens, and full width on smaller screens */}
            <div className="p-2 pl-1 lh-2 d-flex direction-row justify-content-between sticky-top bg-white" >
              <BreadCrumb items={getBreadCrumbList()} />
              <SearchBox />
            </div>

            <div>
              <ChatWindow  height={ (screenDimension.height - navbarHeight - 3) - 67 }/>
            </div>
          </Col>
        </Row>
      </Container>

      {/* 
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
      </Row> */}
    </React.Suspense>
  );
}

export default SubjectMain;
