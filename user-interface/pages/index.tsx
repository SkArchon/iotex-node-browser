import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Col, Container, Row } from 'react-bootstrap';
import { usePersistentStorage } from '../hooks/use-local-storage.hooks';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Iotex Nodes | Home</title>
      </Head>
      <Container>
        <div className="Welcome-Widget-Wrapper">
          <Row>
            <Col>
              <div className="Welcome-Widget-Wrapper__header">
                Welcome to the IOTEX API Gateway Dashboard
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="Welcome-Widget Welcome-Widget--public-nodes" onClick={() => { router.push('/nodes') }}>
              <div>
                <div className="Welcome-Widget__title">
                  View Public API Gateways
                </div>
                <div className="Welcome-Widget__title-description">
                  Looking for an API Gateway? Looking to get in touch with a different node host? Looking for anything node related? We got you covered.
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="Welcome-Widget Welcome-Widget--setup-node" onClick={() => { router.push('/documentation/getting-started') }}>
              <div>
                <div className="Welcome-Widget__sub-title">
                  How To Setup Your Own Node or API Gateway
                </div>
                <div className="Welcome-Widget__sub-description">
                  View our guide on how to get started on setting up your own node, in under 10 minutes!
                </div>
              </div>
            </Col>
            <Col className="Welcome-Widget Welcome-Widget--submit-listing"  onClick={() => { router.push('/management/submit-node') }}>
              <div>
                <div className="Welcome-Widget__sub-title">
                  Submit Your Node For Listing
                </div>
                <div className="Welcome-Widget__sub-description">
                  Contribute to the IOTEX ecosystem by letting the public use your node. Be part of something bigger.
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
