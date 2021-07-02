import React from "react";
import { Col, Row } from 'react-bootstrap';
import { Container } from 'next/app';
import { Container as BootContainer, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap'
import Select from 'react-select';
import { useLocalStorage } from "../../hooks/local-storage.hooks";
import Link from 'next/link'
import { useRouter } from 'next/router';
import { REACT_SELECT_CUSTOM_STYLES } from "../../constants/constants";

export const DocumentationOptionsContext = React.createContext({
  nodeType: 'normal',
  deploymentType: 'Docker',
  network: 'mainnet',
  setNodeType: (value) => {},
  setDeploymentType: (value) => {},
  setNetwork: (value) => {}
});

export const DocumentationLayout = ({ children }) => {
  const router = useRouter();
  const pathName = router.pathname.replace('/documentation/', '');

  const nodeTypeOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'gateway', label: 'API Gateway' },
  ];
  const deploymentOptions = [
    { value: 'docker', label: 'Docker' },
    { value: 'binaries', label: 'Manual Binaries' },
  ];
  const networkOptions = [
    { value: 'mainnet', label: 'Mainnet' },
    { value: 'testnet', label: 'Testnet' },
  ];

  const [nodeType, setNodeType] = useLocalStorage<string>("nodeType", nodeTypeOptions[0].value);
  const [deploymentType, setDeploymentType] = useLocalStorage<string>("deploymentType", deploymentOptions[0].value);
  const [network, setNetwork] = useLocalStorage<string>("network", networkOptions[0].value);
  
  const value = { nodeType, setNodeType, deploymentType, setDeploymentType, network, setNetwork };

  const getOptions = (value, options) => {
    return options.find(entry => entry.value == value);
  };

  return (
    <Container>
      <BootContainer>
        <div className="Setup-Page">
          <Row>
            <Col md="3">
              <div className="Setup-Page__navigation">              
                <div className="Setup-Page__navigation__header">IOTEX Node Setup</div>
                <div className="Setup-Page__navigation__entries">
                  <ul>
                    <li className={pathName == 'getting-started'? 'current-entry' : '' }>
                      <Link href="getting-started">
                        <a>
                          <span>Getting Started</span>
                        </a>
                      </Link>
                      <div className="Border-Cover-Top">
                        &nbsp;
                      </div>
                    </li>
                    <li className={pathName == 'initial-setup'? 'current-entry' : '' }>
                      <Link href="initial-setup">
                        <a>
                          <span>Initial Setup</span>
                        </a>
                      </Link>
                    </li>
                    <li className={pathName == 'setup-configuration' ? 'current-entry' : '' }>
                      <Link href="setup-configuration">
                        <a>
                          <span>Setup Configuration</span>
                        </a>
                      </Link>
                    </li>
                    <li className={pathName == 'setup-snapshot' ? 'current-entry' : '' }>
                      <Link href="setup-snapshot">
                        <a>
                          <span>Snapshot</span>
                        </a>
                      </Link>
                    </li>
                    <li className={pathName == 'operate-node' ? 'current-entry' : '' }>
                      <Link href="operate-node">
                        <a>
                          <span>Operate Node</span>
                        </a>
                      </Link>
                    </li>
                    <li className={pathName == 'upgrade-node' ? 'current-entry' : '' }>
                      <Link href="upgrade-node">
                        <a>
                          <span>Upgrade Node</span>
                        </a>
                      </Link>
                    </li>
                    <li className={pathName == 'interact-with-blockchain' ? 'current-entry' : '' }>
                      <Link href="interact-with-blockchain">
                        <a>
                          <span>Blockchain Interaction</span>
                        </a>
                      </Link>
                      <div className="Border-Cover">
                        &nbsp;
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              { pathName != 'getting-started' &&
                <div className="Setup-Page__select-wrapper">
                  <div className="Setup-Page__select">
                    <div>Node Type</div>
                    <Select
                      styles={REACT_SELECT_CUSTOM_STYLES}
                      value={getOptions(nodeType, nodeTypeOptions)}
                      onChange={(entry) => {setNodeType(entry.value)}}
                      options={nodeTypeOptions}
                    />
                  </div>
                  <div className="Setup-Page__select">
                    <div>Deployment</div>
                    <Select
                      styles={REACT_SELECT_CUSTOM_STYLES}
                      value={getOptions(deploymentType, deploymentOptions)}
                      onChange={(entry) => {setDeploymentType(entry.value)}}
                      options={deploymentOptions}
                    />
                  </div>
                  <div className="Setup-Page__select">
                    <div>Network</div>
                    <Select
                      styles={REACT_SELECT_CUSTOM_STYLES}
                      value={getOptions(network, networkOptions)}
                      onChange={(entry) => {setNetwork(entry.value)}}
                      options={networkOptions}
                    />
                  </div>
                </div>
              }
            </Col>
            <Col md="9">
              <DocumentationOptionsContext.Provider value={value}>
                { children }
              </DocumentationOptionsContext.Provider>
            </Col>
          </Row>
        </div>
      </BootContainer>
    </Container>
  );
}
