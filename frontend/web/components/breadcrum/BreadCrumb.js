import React from "react";
import { Button } from "reactstrap";
import { Breadcrumb, BreadcrumbItem, Container } from "reactstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";

export default function ({ items, separator, startIcon }) {
  const HomeIcon = () => (
    <i className="fas fa-home clark-red" style={{ color: "#cf2e2e" }} />
  );

  return (
    <Breadcrumb
      className="d-none d-md-inline-block ml-lg-4"
      listClassName="breadcrumb-links breadcrumb-dark"
    >
      <BreadcrumbItem>
        <Link to={"/home"}> 
          {startIcon ? startIcon : <HomeIcon />}
        </Link>
      </BreadcrumbItem>
      {items.map((item, index) => (
        <>
          <BreadcrumbItem aria-current="page" className="">
            {item}
          </BreadcrumbItem>
          {index != items.length - 1 && (
            <BreadcrumbItem aria-current="page" className="">
              {separator ? separator : <i class="fas fa-chevron-right"></i>}
            </BreadcrumbItem>
          )}
        </>
      ))}
    </Breadcrumb>
  );
}

{
  /* <BreadcrumbItem>
    <a href="#pablo" onClick={(e) => e.preventDefault()}>
        {parentName}
    </a>
</BreadcrumbItem>  */
}
