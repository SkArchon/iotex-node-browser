import Head from 'next/head'
import React, { useContext } from "react";
import { Col, Container, Row, Form as BootstrapForm } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { DocumentationLayout, DocumentationOptionsContext } from '../../components/layouts/documentationLayout';
import md from 'raw-loader!./md/getting-started/all.md';

const GettingStarted = () => {
  const { deploymentType, network, nodeType, setDeploymentType, setNetwork, setNodeType } = useContext(DocumentationOptionsContext);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Iotex Setup | Home</title>
      </Head>
      <div>
        <ReactMarkdown remarkPlugins={[gfm]} children={md} />
      </div>

      <Row className="Type-Selector">
        <Col>
          <div className="Type-Selector__name">
            Node Type
          </div>
          <span className="Type-Selector__option">
            <input type="radio" value="normal" name="node-type" 
                    checked={nodeType == 'normal'}
                    onChange={({currentTarget}) => setNodeType(currentTarget.value)}/>
            <span className="Type-Selector__option__label">Normal Node</span>
          </span>
          <span className="Type-Selector__option">
            <input type="radio" value="gateway" name="node-type" 
                    checked={nodeType == 'gateway'}
                    onChange={({currentTarget}) => setNodeType(currentTarget.value)}/>
            <span className="Type-Selector__option__label">API Gateway Node</span>
          </span>
        </Col>
        <Col>
          <div className="Type-Selector__name">
            Deployment Type
          </div>
          <span className="Type-Selector__option">
            <input type="radio" value="docker" name="deployment-type" 
                    checked={deploymentType == 'docker'}
                    onChange={({currentTarget}) => setDeploymentType(currentTarget.value)}/>
            <span className="Type-Selector__option__label">Docker</span>
          </span>
          <span className="Type-Selector__option">
            <input type="radio" value="binaries" name="deployment-type" 
                    checked={deploymentType == 'binaries'}
                    onChange={({currentTarget}) => setDeploymentType(currentTarget.value)}/>
            <span className="Type-Selector__option__label">Manual Binaries</span>
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="Type-Selector__name Type-Selector__name--margin-top">
            Network
          </div>
          <span className="Type-Selector__option">
            <input type="radio" value="mainnet" name="network" 
                   checked={network == 'mainnet'}
                   onChange={({currentTarget}) => setNetwork(currentTarget.value)}/>
            <span className="Type-Selector__option__label">Mainnet</span>
          </span>
          <span className="Type-Selector__option">
            <input type="radio" value="testnet" name="network" 
                   checked={network == 'testnet'}
                   onChange={({currentTarget}) => setNetwork(currentTarget.value)}/>
            <span className="Type-Selector__option__label">Testnet</span>
          </span>
        </Col>
      </Row>
      <div>
        <button className="Button Button--submit-node Button--primary btn btn-primary"
        onClick={() => { router.push('/documentation/initial-setup') }}>
          Continue
        </button>
      </div>
    </>
  );
}

GettingStarted.Layout = DocumentationLayout;

export default GettingStarted;
