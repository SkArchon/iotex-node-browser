import Head from 'next/head'
import React, { useContext } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout, DocumentationOptionsContext } from '../../components/layouts/documentationLayout';
import mdManual from 'raw-loader!./md/upgrade-node/manual-binaries.md';
import mdDockerMainnet from 'raw-loader!./md/upgrade-node/docker_mainnet.md';
import mdDockerTestnet from 'raw-loader!./md/upgrade-node/docker_testnet.md';
import { DocumentationComponents } from '../../components/documentation-components';
import { useLocalStorage } from '../../hooks/local-storage.hooks';
import { DocumentationSwitcher } from '../../components/documentation-switcher';

const GettingStarted = () => {
  const { network, deploymentType } = useContext(DocumentationOptionsContext);

  const getMd = () => {
    switch (deploymentType) {
      case 'binaries':
        return mdManual;
      case 'docker':
      default:
        return (network == 'mainnet')
          ? mdDockerMainnet
          : mdDockerTestnet;
    }
  }

  return (
    <>
      <Head>
        <title>Iotex Setup | Home</title>
      </Head>
      <div>
        <ReactMarkdown components={DocumentationComponents}  children={getMd()} />
      </div>

      <DocumentationSwitcher 
        leftUrl="/documentation/operate-node"
        leftLabel="Operate Node"
        rightUrl="/documentation/interact-with-blockchain"
        rightLabel="Blockchain Interaction"
      />
    </>
  );


}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
