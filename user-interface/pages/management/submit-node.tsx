import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Col, Row, Spinner } from 'react-bootstrap';
import { usePersistentStorage } from '../../hooks/use-local-storage.hooks';
import { ManagementLayout } from '../../components/layouts/managementLayout';
import { ApiHelper } from '../../helpers/api-helper';
import { FAILURE_SNACKBAR, SUCCESS_SNACKBAR } from "../../constants/common.constants";
import { useSnackbar } from 'react-simple-snackbar'
import { useRouter } from 'next/router'
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";

const SubmitNodePage = () => {
  const DEFAULT_INITIAL_VALUES = {
    name: "",
    address: "",
    email: "",
    telegram: "",
  };

  const RECAPTCHA_SITE_KEY = "6LdEHEYbAAAAACNgtdG3G1cW-7kCLdcqFCBfAM7U";

  const SUBMIT_SCHEMA = Yup.object().shape({
    name: Yup.string()
      .required("Name is required"),
    address: Yup.string()
      .required("Address is required")
      .min(4, "Address is too short - should be 4 chars min")
      .test(
        'starts-with',
        "Has to start with http:// or https://",
        (value) => !!(value?.toLowerCase().startsWith('http://') || value?.toLowerCase().startsWith('https://')),
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Email is not valid")
  });


  const router = useRouter();
  const [userAccount, _] = usePersistentStorage("userAccount", {});

  const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(SUCCESS_SNACKBAR);
  const [openFailureSnackbar, closeFailureSnackbar] = useSnackbar(FAILURE_SNACKBAR);

  const [loadingState, setLoadingState] = useState("PENDING");
  const [initialValues, setInitialValues] = useState(DEFAULT_INITIAL_VALUES);
  const [saving, setSavingState] = useState(false);

  const reRef = useRef<ReCAPTCHA>();

  const existingNode = !!router.query.id;
  if(loadingState != "SUCCESS" && !existingNode) {
    setLoadingState("SUCCESS");
  }

  if(existingNode) {
    useEffect(() => {
      (async function fetchData() {
        const { data } = await axios.post(`/node/search/${router.query.id}`, {});
        setInitialValues(data);
      })()
    }, [router.query.id]);
  }

  const submit = async (data: any) => {
    try {
      const token = await reRef.current.getValue();
      const processedData = { ...data, token: token };
      
      await axios.post("/node", processedData);
      openSuccessSnackbar("Successfully submitted the node details");
      router.push("my-nodes");
    }
    catch(e) {
      console.error(e);
      setSavingState(false);
      openFailureSnackbar("Unable to submit the node details, please try again.");
    }
  };

  return (
    <div className="Node-Submission-Container">
      <Head>
        <title>Iotex Nodes | Management - Submit Node</title>
      </Head>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={SUBMIT_SCHEMA}
        onSubmit={ async(values) => {
          setSavingState(true);
          await submit(values);
        }}
      >
        {(formik) => {
          return (
            <div>
              <>
                { existingNode && <h3>Edit API Gateway</h3> }
                { !existingNode && <h3 className="Node-Submission-Container__New-Header">API Gateway Submission</h3> }
              </>
              { !existingNode &&
                <Row>
                  <Col>
                    <a href="/documentation/getting-started" className="Node-Submission-Container__Setup-Link">Wondering how to setup your API Gateway Node? Click here.</a>
                  </Col>
                </Row>
              }
              <Form>
                <Row>
                  <Col>
                    <span className="Form-Field__grouping-header">API Gateway Details</span>
                  </Col>
                </Row>

                <Row>
                  <Col className="Form-Field">
                    <label className="Form-Field__label" htmlFor="name">Gateway Name *</label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="The name you want to give your API Gateway"
                      className="Form-Field__field"
                    />
                    <ErrorMessage name="name" component="span" className="Form-Field__error" />
                  </Col>
                </Row>

                <Row>
                  <Col className="Form-Field">
                    <label className="Form-Field__label" htmlFor="address">Endpoint *</label>
                    <Field
                      type="text"
                      name="address"
                      placeholder="The endpoint address (e.g.: https://28.48.68.87:443)"
                      id="address"
                      className="Form-Field__field"
                    />
                    <ErrorMessage
                      name="address"
                      component="span"
                      className="Form-Field__error"
                    />
                </Col>
                </Row>

                <Row>
                  <Col>
                    <span className="Form-Field__grouping-header Form-Field__grouping-header--top-padding">Contact Information</span>
                  </Col>
                </Row>

                <Row>
                  <Col className="Form-Field">
                    <label className="Form-Field__label" htmlFor="email">Email *</label>
                    <Field
                      type="text"
                      name="email"
                      placeholder="Email that admins can use to contact you"
                      id="email"
                      className="Form-Field__field"
                    />
                    <ErrorMessage name="email" component="span" className="Form-Field__error" />
                  </Col>
                </Row>

                <Row>
                  <Col className="Form-Field">
                    <label className="Form-Field__label" htmlFor="telegram">Telegram</label>
                    <Field
                      type="text"
                      name="telegram"
                      placeholder="Telegram that admins can use to contact you"
                      id="telegram"
                      className="Form-Field__field"
                    />
                    <ErrorMessage name="telegram" component="span" className="Form-Field__error" />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="recaptcha-wrapper">
                      <ReCAPTCHA
                        sitekey={RECAPTCHA_SITE_KEY}
                        ref={reRef}
                      />
                    </div>
                  </Col>
                </Row>


                <button className="Button Button--submit-node Button--primary Button--full-width"
                        disabled={saving}
                        type="submit">
                  { saving &&
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  }
                  <span>
                    { existingNode && "Update Node Details" }
                    { !existingNode && "Submit New Node" }
                  </span>
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

SubmitNodePage.Layout = ManagementLayout;

export default SubmitNodePage;
