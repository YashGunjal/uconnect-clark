import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";


import { appLoaderKey } from "../../../AppLoaderSlice";
import { useSelector } from "react-redux";
import {
  Alert,

  List,
  Collapse,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

import { subjectskey } from "../main/SubjectsSlice"


export default  function CourseList() {
  const { sidePanelOpen } = useSelector((state) => {
    return state[subjectskey];
  });
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });

  const AccordianContent = () => {
    const [openedCollapses, setOpenedCollapse] = useState([1]);
    const collapsesToggle = (collapse) => {
      if (openedCollapses.includes(collapse)) {
        setOpenedCollapse([]);
      } else {
        setOpenedCollapse([collapse]);
      }
    };

    const AccordianCard = ({ title, index }) => (
      <Card className="card-plain m-0" >
        <CardHeader
          className="m-0 bg-clark-red"
          role="tab"
          onClick={() => collapsesToggle(index)}
          aria-expanded={openedCollapses.includes(index)}
          color="clark-red text-white"
          style={{
            text:"white",
            color:"white"
          }}
        >
          <div className=" d-flex justify-content-between flex-row "> 
            
            <h5 className="mb-0 text-white">
            {title}{" "} </h5>
            {openedCollapses.includes(index) ? (
              <FaAngleUp />
              ) : (
                <FaAngleDown />
                )}{" "}
                </div>
        </CardHeader>
        <Collapse
          role="tabpanel"
          isOpen={openedCollapses.includes(index)}
        >
          <CardBody className="text-dark">
            <List>
              <li>Algorithms</li>
              <li>Computer Architecture</li>
              <li>Cyber Security</li>
            </List>
          </CardBody>
        </Collapse>
      </Card>
    );

    return (
      <>
        <div className="accordion m-0">
          <AccordianCard title={"MS in IT"} inedx={1} />
          <AccordianCard title={"MS in CS"} index={2}/>
          <AccordianCard title={"MS in DA"} index={3}/>
        </div>
      </>
    );
  };


  return (
      <div>
        
        <Collapse  horizontal
        delay={{ show: 10}}
        isOpen={sidePanelOpen} 

            // style={{
            //   width: "25%",
            // }}
          >
            <Alert className="p-1"  color="clark-red">
            <AccordianContent />
          </Alert>
            </Collapse>
      </div>
    
  );
}



