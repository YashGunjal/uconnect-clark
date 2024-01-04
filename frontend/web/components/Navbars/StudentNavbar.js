import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Collapse,
  Row,
  Col,
} from "reactstrap";
import Logout from "../logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import {
  DataLoaderKey,
  updateSelecedDepartment,
} from "../../containers/dataloader/DataloaderSlice";
import { appLoaderKey } from "../../AppLoaderSlice";
import Login from "../login/Login";
import { updateOnlySelectedSubject } from "../../containers/sections/main/subjects/SubjectsSlice";

function StudentNavbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const { departmentList } = useSelector((state) => {
    return state[DataLoaderKey];
  });
  const { user, screenDimension } = useSelector((state) => {
    return state[appLoaderKey];
  });

  const collapseToggle =
    screenDimension.width < 1200 ? () => setIsOpen(!isOpen) : () => {};

  const HeaderClick = (id) => {
    dispatch(updateSelecedDepartment(id));
    dispatch(updateOnlySelectedSubject());
  };

  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main bg-white"
        expand="xl"
        light
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/home" tag={Link}>
            <img
              alt="..."
              style={{ height: "45px" }}
              src={require("../../../assets/main-logo.svg").default}
            />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            onClick={(val) => {
              console.log("in fucntion", val, isOpen);
              setIsOpen(!isOpen);
            }}
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <UncontrolledCollapse */}
          <Collapse
            isOpen={isOpen}
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/home" onClick={() => setIsOpen(!isOpen)}>
                    <img
                      alt="..."
                      src={
                        require("../../../assets/clark-logo-only.png").default
                      }
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={isOpen}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                    onClick={(val) => {
                      console.log("in fucntion down cross", isOpen);
                      setIsOpen(!isOpen);
                    }}
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
                  <span
                    onClick={collapseToggle}
                    className="nav-link-inner--text text-dark text-lg"
                  >
                    Home
                  </span>
                </NavLink>
              </NavItem>
              {Object.keys(departmentList).map((id, index) => (
                <NavItem onClick={(e) => HeaderClick(id)} id={index}>
                  <NavLink
                    to={"/home/" + departmentList[id].toLowerCase()}
                    tag={Link}
                  >
                    <span
                      onClick={collapseToggle}
                      className="nav-link-inner--text  text-dark text-lg"
                    >
                      {departmentList[id].toUpperCase()}
                    </span>
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem className=" d-lg-block ml-lg-4">
                {user.isLoggedIn ? <Logout /> : <Login />}
              </NavItem>
            </Nav>
            {/* </UncontrolledCollapse> */}
          </Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          border: "0.2px solid #cf2e2e",
        }}
      />
    </>
  );
}

export default StudentNavbar;
