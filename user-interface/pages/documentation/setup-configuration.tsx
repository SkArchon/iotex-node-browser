import Head from 'next/head'
import React, { useContext } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout, DocumentationOptionsContext } from '../../components/layouts/documentationLayout';
import mdMainnet from 'raw-loader!./md/setup-configuration/mainnet.md';
import mdTestnet from 'raw-loader!./md/setup-configuration/testnet.md';
import mdManual from 'raw-loader!./md/setup-configuration/manual-binaries.md';
import { DocumentationComponents } from '../../components/documentation-components';
import { useLocalStorage } from '../../hooks/local-storage.hooks';
import { DocumentationSwitcher } from '../../components/documentation-switcher';

const GettingStarted = () => {
  const { network, deploymentType } = useContext(DocumentationOptionsContext);

  const getMd = () => {
    switch (network) {
      case 'testnet':
        return mdTestnet;
      case 'mainnet':
        return mdMainnet;
      default:
        return mdMainnet;
    }
  }

  return (
    <>
      <Head>
        <title>Iotex Setup | Home</title>
      </Head>
      <div>
        { deploymentType == 'binaries' &&
          <ReactMarkdown components={DocumentationComponents}  children={mdManual} />  
        }
        <ReactMarkdown components={DocumentationComponents}  children={getMd()} />
      </div>

      <DocumentationSwitcher 
        leftUrl="/documentation/initial-setup"
        leftLabel="Initial Setup"
        rightUrl="/documentation/setup-snapshot"
        rightLabel="Setup Snapshot"
      />
    </>
  );


}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
