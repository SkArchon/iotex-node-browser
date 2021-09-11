import Head from 'next/head'
import React from "react";
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import { DocumentationLayout } from '../../components/layouts/documentationLayout';
import { DocumentationSwitcher } from '../../components/documentation-switcher';
import md from 'raw-loader!./md/initial-setup/all.md';
import { DocumentationComponents } from '../../components/documentation-components';

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
        leftUrl="/documentation/getting-started"
        leftLabel="Geting Started"
        rightUrl="/documentation/setup-configuration"
        rightLabel="Setup Configuration"
      />
    </>
  );
}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
