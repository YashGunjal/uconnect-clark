import React from "react";
import { Button } from "reactstrap";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { clarkRed } from "../../constants/ColorConstants";

export default function ({ items, separator, startIcon }) {
  const HomeIcon = () => (
    <i className="fas fa-home clark-red clark-color" />
  );

  return (
    <Breadcrumb id={"main breadcrumb"} key={"main breadcrumb"}
      className=" d-md-inline-block ml-lg-4"
      listClassName="breadcrumb-links breadcrumb-dark"
    >
      <BreadcrumbItem id={"main-home"} key={"main-home"}>
        <Link to={"/home"}> 
          {startIcon ? startIcon : <HomeIcon />}
        </Link>
      </BreadcrumbItem>
      {items.map((item, index) => (
        <>
          <BreadcrumbItem id={index+100} key={index+100} aria-current="page" className="">
            {item}
          </BreadcrumbItem>
          {index != items.length - 1 && (
            <BreadcrumbItem id={index+1000} key={index+1000} aria-current="page" className="">
              {separator ? separator : <i className="fas fa-chevron-right"></i>}
            </BreadcrumbItem>
          )}
        </>
      ))}
    </Breadcrumb>
  );
}
