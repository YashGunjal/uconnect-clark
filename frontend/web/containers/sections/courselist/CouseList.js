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
  Modal,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { subjectskey } from "../main/SubjectsSlice"


export default  function CourseList() {
  const [subjectModal, setSubjectModal] = useState(false)
  const [openedCollapses, setOpenedCollapse] = useState([1]);
  
  const { sidePanelOpen } = useSelector((state) => {
    return state[subjectskey];
  });
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });


  const courselist = [
    "Algorithms",
              "Computer Architecture",
              "Cyber Security"
  ]

  const showDetails= (e) => {
    e.preventDefault()
    setSubjectModal(true)
  }

  const handleClose = () => {
    setSubjectModal(false);
  };

  const AccordianContent = () => {
    
    const collapsesToggle = (collapse) => {
      console.log(openedCollapses, collapse)
      if (openedCollapses.includes(collapse)) {
        setOpenedCollapse([]);
      } else {
        setOpenedCollapse([collapse]);
      }
    };
    console.log(openedCollapses)
    
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
              {courselist.map((course, index) => (
                <li className="pointer" key={index}  onClick={(e)=>showDetails(e)} >{course}</li>

              ))}
              
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




<Modal
          isOpen={subjectModal}
          toggle={handleClose}
          onClosed={handleClose}
        >
          <ModalBody>
            <Card>

              <CardHeader> 
                <p className="h-5"> Course Name </p>
              </CardHeader>
              <CardBody> 
                <p> detail about the subject will be given here</p>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    
  );
}



