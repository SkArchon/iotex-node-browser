import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const TopBar = () => {
  const router = useRouter();
  const pathName = router.pathname;

  const NavigationUser = dynamic(
    () => (import('./navigation-user')),
    { ssr: false }
  )

  return (
    <>
      <Navbar className="Top-Bar" expand="sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="/" className="navbar-brand">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link className={pathName == '/' ? 'active' : '' }>Home</Nav.Link>
              </Link>
              <Link href="/nodes" passHref>
                <Nav.Link className={(pathName.startsWith('/nodes')) ? 'active' : '' }>API Gateways</Nav.Link>
              </Link>
              <Link href="/management/my-nodes" passHref>
                <Nav.Link className={(pathName.startsWith('/management')) ? 'active' : '' } >Management</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
          <NavigationUser></NavigationUser>
        </Container>
      </Navbar>
    </>
  )
}

