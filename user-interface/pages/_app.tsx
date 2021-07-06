import type { AppProps } from 'next/app'
import '../styles/common.scss';
import React, { Component, useContext } from "react";
import SnackbarProvider from 'react-simple-snackbar'
import {AppWrapper} from '../components/app-wrapper';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SnackbarProvider>
        <AppWrapper Component={Component} pageProps={pageProps}></AppWrapper>
      </SnackbarProvider>
    </>
  )
}
export default App
