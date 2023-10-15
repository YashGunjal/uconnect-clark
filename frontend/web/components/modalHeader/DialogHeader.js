import React from "react";
import { CardHeader, Row, Col, UncontrolledTooltip } from "reactstrap";
export default function DialogHeader( {onClose,  heading }){

    return (
        <CardHeader className="border-0 mb-0">
          <Row>
            <Col xs="9">
              <h2 className="ls-1 py-3 mb-0 font-weight-700 text-xl" style={{color:"#172B4D"}} >
                {heading}
              </h2>
            </Col>
            <Col className="text-right" xs="3" >
              <span
                id="tooltipheader234"
                style={{ fontSize: "30px", cursor: "pointer"}}
                onClick={onClose}
              >
                <i className="ni ni-fat-remove bg-red rounded-circle p-1 text-white text-xl" />
              </span>
              <UncontrolledTooltip delay={0} target="tooltipheader234">
                Close
              </UncontrolledTooltip>
            </Col>
          </Row>
          </CardHeader>
    )
}