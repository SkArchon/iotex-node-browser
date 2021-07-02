import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { ManagementLayout } from '../../components/layouts/managementLayout';
import { usePersistentStorage } from "../../hooks/use-local-storage.hooks";
import NetworkManagementEntry from "../../components/network-management-entry";
import { ApiHelper } from "../../helpers/api-helper";
import Head from "next/head";
import { Col, Row, Spinner } from "react-bootstrap";

const AllNodes = () => {
  const [userAccount, _] = usePersistentStorage("userAccount", {});
  const [nodeEntries, setNodeEntries] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({ page: 1, limit: 20, showPendingOnly: false });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    (async function fetchData() {
      try {
        setError(null);
        setLoading(true);
        setNodeEntries([]);

        const body = ApiHelper.getSignedPayload(userAccount.loginSignedData, userAccount.loginSignedResult, searchCriteria);
        const { data } = await axios.post("/node/search", body);
        setNodeEntries(data);
        setLoading(false);
      }
      catch(e) {
        setLoading(false);
        setError(e);
      }
    })()
  }, [searchCriteria]);

  const onShowPendingChange = (event) => {
    const optionValue = event.target.checked;
    setSearchCriteria({
      ...searchCriteria,
      showPendingOnly: optionValue
    })
  }

  return (
    <div>
      <Head>
        <title>Iotex Nodes | Management - All Nodes</title>
      </Head>
      <div className="Nodes-Search-Criteria">
        <input type="checkbox" onChange={onShowPendingChange}/> Show Only Pending
      </div>
      { nodeEntries.map((result: any) => {
        return (
          <>
            <NetworkManagementEntry result={result} userAccount={userAccount} showApprove={true} showEdit={false} />
          </>
        )
      })}
      {!error && !loading && nodeEntries.length == 0 && 
        <Row>
          <Col>
            <div className="Node-List__center-text">
              There are no nodes matching your search criteria.
            </div>
          </Col>
        </Row>
      }
      {error && 
        <Row>
          <Col>
            <div className="Node-List__center-text">
              There was an error loading the node data, please refresh and try again.
            </div>
          </Col>
        </Row>
      }
      { loading &&
        <Row>
          <Col>
            <div className="Node-List__center-text">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      }
    </div>
  );
}

AllNodes.Layout = ManagementLayout;

export default AllNodes;
