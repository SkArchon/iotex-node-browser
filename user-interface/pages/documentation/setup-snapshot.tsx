import Head from 'next/head'
import React, { useContext } from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout, DocumentationOptionsContext } from '../../components/layouts/documentationLayout';
import mdMainnetNormal from 'raw-loader!./md/setup-snapshot/setup-snapshot/mainnet_normal.md';
import mdTestnetNormal from 'raw-loader!./md/setup-snapshot/setup-snapshot/testnet_normal.md';
import mdMainnetGateway from 'raw-loader!./md/setup-snapshot/setup-snapshot/mainnet_gateway.md';
import mdTestnetGateway from 'raw-loader!./md/setup-snapshot/setup-snapshot/testnet_gateway.md';

import mdStartNodeDockerNormal from 'raw-loader!./md/setup-snapshot/start-node/docker_normal.md';
import mdStartNodeDockerGateway from 'raw-loader!./md/setup-snapshot/start-node/docker_gateway.md';
import mdStartNodeBinariesNormal from 'raw-loader!./md/setup-snapshot/start-node/manual-binaries_normal.md';
import mdStartNodeBinariesGateway from 'raw-loader!./md/setup-snapshot/start-node/manual-binaries_gateway.md';
import { DocumentationComponents } from '../../components/documentation-components';
import { useLocalStorage } from '../../hooks/local-storage.hooks';
import { DocumentationSwitcher } from '../../components/documentation-switcher';

const GettingStarted = () => {
  const { network, nodeType, deploymentType } = useContext(DocumentationOptionsContext);

  const getSnapshotMd = () => {
    switch (network) {
      case 'testnet':
        return (nodeType == 'normal')
          ? mdTestnetNormal
          : mdTestnetGateway;
      case 'mainnet':
        return (nodeType == 'normal')
          ? mdMainnetNormal
          : mdMainnetGateway;
      default:
        return mdMainnetNormal;
    }
  }

  const getStartNodeMd = () => {
    switch (nodeType) {
      case 'normal':
        return (deploymentType == "docker")
          ? mdStartNodeDockerNormal
          : mdStartNodeBinariesNormal;
      case 'gateway':
        return (deploymentType == "docker")
          ? mdStartNodeDockerGateway
          : mdStartNodeBinariesGateway;
      default:
        return mdMainnetNormal;
    }
  }

  return (
    <>
      <Head>
        <title>Iotex Setup | Home</title>
      </Head>
      <div>
        <ReactMarkdown components={DocumentationComponents}  children={getSnapshotMd()} />
        <ReactMarkdown components={DocumentationComponents}  children={getStartNodeMd()} />
      </div>

      <DocumentationSwitcher 
        leftUrl="/documentation/setup-configuration"
        leftLabel="Setup Configuration"
        rightUrl="/documentation/operate-node"
        rightLabel="Operate Node"
      />
    </>
  );

}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
