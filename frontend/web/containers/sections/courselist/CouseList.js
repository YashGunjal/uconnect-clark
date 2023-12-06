import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import { appLoaderKey } from "../../../AppLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
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
  ModalFooter,
} from "reactstrap";

import {
  subjectskey,
  updateCourse,
  updateSubject,
  updateSelectedSubject,
} from "../main/SubjectsSlice";
import SubjectServices from "../../../../services/SubjectService";
import { DataLoaderKey } from "../../dataloader/DataloaderSlice";

export default function CourseList() {
  const dispatch = useDispatch();
  const [subjectModal, setSubjectModal] = useState(false);
  const [openedCollapses, setOpenedCollapse] = useState([1]);

  const { sidePanelOpen, courses, subjects , selectedSubject} = useSelector((state) => {
    return state[subjectskey];
  });
  const { user } = useSelector((state) => {
    return state[appLoaderKey];
  });

  const { selectedDepartment } = useSelector((state) => {
    return state[DataLoaderKey];
  });

  function MouseOver(event) {
    event.target.style.background = "#d2f4ea"; //'#cf2e2eab';
  }
  function MouseOut(event){
    event.target.style.background="";
  }

  useEffect(async () => {
    let response = await SubjectServices.getCoursesAndSubjects(selectedDepartment);
    dispatch(updateCourse(response.courses));
    dispatch(updateSubject(response.subjects));

    console.log("fetch response", response);
  }, [selectedDepartment]);

  const showDetails = (e) => {
    e.preventDefault();
    setSubjectModal(true);
  };

  const handleClose = () => {
    setSubjectModal(false);
  };

  const AccordianContent = () => {
    const collapsesToggle = (collapse) => {
      console.log(openedCollapses, collapse);
      if (openedCollapses.includes(collapse)) {
        setOpenedCollapse([]);
      } else {
        setOpenedCollapse([collapse]);
      }
    };
    console.log(openedCollapses);

    const AccordianCard = ({ title, courseId, index }) => (
      <Card className="card-plain m-0">
        <CardHeader
          className="m-0 bg-clark-red"
          role="tab"
          onClick={() => collapsesToggle(index)}
          aria-expanded={openedCollapses.includes(index)}
          color="clark-red text-white"
          style={{
            text: "white",
            color: "white",
          }}
        >
          <div className=" d-flex justify-content-between flex-row ">
            <h5 className="mb-0 text-white">{title} </h5>
            {openedCollapses.includes(index) ? (
              <FaAngleUp />
            ) : (
              <FaAngleDown />
            )}{" "}
          </div>
        </CardHeader>
        <Collapse role="tabpanel" isOpen={openedCollapses.includes(index)}>
          <CardBody className="text-dark">
            <List className="list-unstyled btn-toggle-nav pb-1 mb-1">
              {subjects?.[courseId]?.length > 0 ? (
                subjects?.[courseId]?.map((subject) => (
                  <li
                    className="pointer  link-dark rounded-sm p-1 pb-2"
                    onMouseOver={MouseOver} onMouseOut={MouseOut}
                    key={index}
                    onClick={(e) => dispatch(updateSelectedSubject(subject))}
                  >
                   {selectedSubject == subject.id ? <strong className={"clark-color" } > 
                   {subject.name}
                   </strong> :
                   subject.name}
                  </li>
                ))
              ) : (<> No subjects added yet.</>
                
              )}

             
            </List>
          </CardBody>
        </Collapse>
      </Card>
    );

    return (
      <>
        <div className="accordion m-0">
          {Object.keys(courses).length > 0 ? (
            courses?.map((course, index) => (
              <AccordianCard
                title={course.name}
                courseId={course.id}
                index={index+1}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <Collapse
        horizontal
        delay={{ show: 10 }}
        isOpen={sidePanelOpen}

        // style={{
        //   width: "25%",
        // }}
      >
        <Alert className="p-1" color="clark-red">
          <AccordianContent />
        </Alert>
      </Collapse>

      <Modal isOpen={subjectModal} toggle={handleClose} onClosed={handleClose}>
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
