import { Container } from 'next/app';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Container as BootContainer, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from "../app-wrapper";

export const ManagementLayout = ({ children }) => {
  const router = useRouter();
  const pathName = router.pathname.replace('/management/', '');

  const { userAccount } = useContext(UserContext);

  const ManagementLayoutContentWrapper = dynamic(
    () => (import('./management-layout-content-wrapper')),
    { ssr: false }
  )

  return (
    <div className="content-container">
      <Navbar className="Sub-Top-Bar" expand="sm">
        <BootContainer>
          <Nav className="me-auto">
            <Link href="my-nodes" passHref>
              <Nav.Link className={pathName == 'my-nodes'? 'active' : '' }>My Nodes</Nav.Link>
            </Link>
            <Link href="submit-node" passHref>
              <Nav.Link className={pathName == 'submit-node'? 'active' : '' }>Submit Node</Nav.Link>
            </Link>
            { userAccount.isAdmin && 
              <Link href="all-nodes" passHref>
                <Nav.Link className={pathName == 'all-nodes'? 'active' : '' }>All Nodes</Nav.Link>
              </Link>
            }
          </Nav>
        </BootContainer>
      </Navbar>
      <Container>
        <ManagementLayoutContentWrapper children={children} userAddress={userAccount.userAddress}></ManagementLayoutContentWrapper>
      </Container>
    </div>
  );
}

