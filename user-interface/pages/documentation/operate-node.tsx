import Head from 'next/head'
import React, { useContext } from "react";
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout, DocumentationOptionsContext } from '../../components/layouts/documentationLayout';
import mdDocker from 'raw-loader!./md/operate-node/docker.md';
import mdManual from 'raw-loader!./md/operate-node/manual-binaries.md';
import { DocumentationComponents } from '../../components/documentation-components';
import { DocumentationSwitcher } from '../../components/documentation-switcher';

const GettingStarted = () => {
  const { deploymentType } = useContext(DocumentationOptionsContext);
  
  const getMd = () => {
    switch (deploymentType) {
      case 'docker':
        return mdDocker;
      case 'binaries':
        return mdManual;
      default:
        return mdDocker;
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
        leftUrl="/documentation/setup-snapshot"
        leftLabel="Setup Snapshot"
        rightUrl="/documentation/upgrade-node"
        rightLabel="Upgrade Node"
      />
    </>
  );


}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
