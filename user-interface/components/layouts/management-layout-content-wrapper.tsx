import React from "react";
import { Col, Row } from 'react-bootstrap';
import ManagementLogin from "../../components/management-login";

export default function ManagementLayoutContentWrapper({ children, userAddress }) {
  return (
    <div className="Node-Submission-Wrapper Center-Content Center-Content--node-form">
      <Row>
        <Col>
          <div className="Management-Page">
          { !userAddress && 
            <>
                <ManagementLogin description="Click the login button below to gain access to the management console."></ManagementLogin>
            </>
          }
          { userAddress && children }
          </div>
        </Col>
      </Row>
    </div>
  );
}

