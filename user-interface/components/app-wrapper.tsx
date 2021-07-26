import type { AppInitialProps, AppProps } from 'next/app'
import axios from "axios";
import React, { Component, useContext } from "react";
import DefaultLayout from './layouts/defaultLayout';
import { TopBar } from './top-bar';
import { usePersistentStorage } from '../hooks/use-local-storage.hooks';
import { useSnackbar } from 'react-simple-snackbar'
import { FAILURE_SNACKBAR, SUCCESS_SNACKBAR } from '../constants/common.constants';
import Web3 from 'web3';
import { NextComponentType, NextPageContext } from 'next';

export const UserContext = React.createContext({
  userAccount: ({} as any),
  loginUser: async (currentUserAddress?) => {},
  resetUserAccount: () => {}
});

// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'http://45.79.212.82:4000/api';

type AppWrapperProps = {Component: NextComponentType<NextPageContext>} & AppInitialProps;

export function AppWrapper({ Component, pageProps }: AppWrapperProps) {
  const Layout = (Component as any).Layout || DefaultLayout;

  const [userAccount, setUserAccount, resetUserAccount] = usePersistentStorage("userAccount", {});

  const [openSuccessSnackbar] = useSnackbar(SUCCESS_SNACKBAR);
  const [openFailureSnackbar] = useSnackbar(FAILURE_SNACKBAR);

  const loginUser = async (currentUserAddress?) => {
    const ethereum = (window as any).ethereum;

    if (!ethereum) {
      // In case the browser or plugin was changed
      if (currentUserAddress) {
        setUserAccount({});
      }
      openFailureSnackbar("Please make sure metamask is installed to login to the application")
      return;  
    }

    try {
      const accounts = await ethereum.send('eth_requestAccounts');
      const currentAccount = accounts.result[0];

      if(!currentAccount) {
        setUserAccount({});
        return;
      }
      if(currentUserAddress && currentAccount.toLowerCase() === currentUserAddress.toLowerCase()) {
        return;
      }

      const nonce = `${crypto.getRandomValues(new Uint32Array(10))}`;
      const web3 = new Web3(ethereum);
      const signedResult = await (web3.eth.personal as any).sign(nonce, currentAccount);

      const { data } = await axios.post("/user-login", { nonce: nonce, signature: signedResult });
      
      setUserAccount({
        ...data,
        loginSignedData: nonce,
        loginSignedResult: signedResult
      });

      openSuccessSnackbar("You have been successfully logged in");
    }
    catch(e) {
      console.error(e);
      setUserAccount({});
      openFailureSnackbar("An error occurred while attempting to login");
    }
  }

  if(userAccount.userAddress) {
    loginUser(userAccount.userAddress);
  }

  return (
    <>
      <UserContext.Provider value={{ userAccount, loginUser, resetUserAccount }}>
        <TopBar/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </>
  )
}
