import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { UserContext } from "./app-wrapper";
import { Col, Nav, Row, Spinner } from "react-bootstrap";

export default function ManagementLogin({description}) {
  const { loginUser } = useContext(UserContext);

  return (
    <div className="Node-List__center-text">
      Log In To Get Started
      <p className="Node-List__sub-text">
        { description }
      </p>
      <div className="login-text-wrapper login-text-wrapper--large" onClick={() => loginUser(null)}>
        <Image src="/metamask.png" className="login-logo" alt="metamask" width="25" height="25"/> 
        <Nav.Link className="login-text">Login</Nav.Link>
      </div>
    </div>
  )
}
