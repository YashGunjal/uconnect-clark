import React, { useState } from "react";
import { appLoaderKey } from "../../../AppLoaderSlice";
import { DataLoaderKey } from "../../dataloader/DataloaderSlice";
import { useSelector } from "react-redux";

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
import SidePanel from "../sidepanel/SidePanel";
import ChatWindow from "../chatwindow/ChatWindow";
import BreadCrumb from "../../../components/breadcrum/BreadCrumb";

function SubjectMain({ department }) {
  const [collapse, setCollapse] = useState(true);
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });

  const { id, name } = department;
  return (
    <React.Suspense fallback="Loading...">
      <Row>
        <Col className="border pt-2 text-center" xs="3">
          <Button
            color="clark-red "
            id="toggler"
            style={{
              marginBottom: "1rem",
            }}
            onClick={() => setCollapse(!collapse)}
          >
            Show All Courses
          </Button>
        </Col>
        <Col className="border p-2 pl-1 lh-2" xs="9">
          <BreadCrumb items={[name, "MS CS", " Software Engineering"]} />
        </Col>
      </Row>

      <Row>
        <Col className="border" xs={collapse ? "3" : ""}>
          <SidePanel collapse={collapse} setCollapse={setCollapse} />
        </Col>
        <Col className="border" xs={collapse ? "9" : "12"}>
          <ChatWindow />
        </Col>
      </Row>
    </React.Suspense>
  );
}

export default SubjectMain;
