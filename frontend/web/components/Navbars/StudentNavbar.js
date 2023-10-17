import React from 'react';
import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import Logout from '../logout/Logout';

function StudentNavbar() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-light "
        expand="xl"
        dark
        style={{
          // backgroundColor:"#cf2e2e"
        }}
        id="navbar-main"
        
      >
        <Container>
          <NavbarBrand to="/home" tag={Link}>
            <img
              alt="..."
              style={{height:"45px"}} 
              src={require("../../../assets/main-logo.svg").default}
            />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/home">
                    <img
                      alt="..."
                      src={require("../../../assets/clark-logo-only.png").default}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/home" tag={Link}>
                  <span className="nav-link-inner--text text-dark text-lg">Home</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home/sps" tag={Link}>
                  <span className="nav-link-inner--text  text-dark text-lg">SPS</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home/som" tag={Link}>
                  <span className="nav-link-inner--text text-dark text-lg">SOM</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home/arts" tag={Link}>
                  <span className="nav-link-inner--text  text-dark text-lg">Arts</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home/finance" tag={Link}>
                  <span className="nav-link-inner--text text-dark text-lg">Finance</span>
                </NavLink>
              </NavItem>
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem className="d-none d-lg-block ml-lg-4">
               <Logout />
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      <div style={{
         border: "0.2px solid #cf2e2e",
      }} />
       
    
    </>
  );
}

export default StudentNavbar;
