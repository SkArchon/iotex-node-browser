import React, { useContext } from 'react'
import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { UserContext } from './app-wrapper';

export default function NavigationUser() {
  const { userAccount, loginUser, resetUserAccount } = useContext(UserContext);

  const shortenAddress = (address) => {
    const firstThree = address.substring(0, 4);
    const latestThree = address.substr(address.length - 2);
    return `${firstThree}..${latestThree}`;
  }

  return (
    <>
      {(userAccount.userAddress)
        ? <DropdownButton className="User-Address-Button" title={ shortenAddress(userAccount.userAddress) }>
            <Dropdown.Item onClick={() => resetUserAccount()}>Logout</Dropdown.Item>
          </DropdownButton> 
        : <>
            <div className="login-text-wrapper" onClick={() => loginUser(null)}>
              <Image src="/metamask.png" className="login-logo" alt="metamask" width="25" height="25"/> 
              <Nav.Link className="login-text">Login</Nav.Link>
            </div>
          </>
      }
    </>
  )
}

