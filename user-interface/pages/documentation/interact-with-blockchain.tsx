import Head from 'next/head'
import React from "react";
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout } from '../../components/layouts/documentationLayout';
import md from 'raw-loader!./md/interact-with-blockchain/all.md';
import { DocumentationComponents } from '../../components/documentation-components';
import { DocumentationSwitcher } from '../../components/documentation-switcher';

const GettingStarted = () => {

  return (
    <>
      <Head>
        <title>Iotex Setup | Home</title>
      </Head>
      <div>
        <ReactMarkdown components={DocumentationComponents}  children={md} />
      </div>

      <DocumentationSwitcher 
        leftUrl="/documentation/upgrade-node"
        leftLabel="Upgrade Node"
      />
    </>
  );


}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
