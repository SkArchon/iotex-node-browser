import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { UserContext } from "../../components/app-wrapper";
import { ManagementLayout } from '../../components/layouts/managementLayout';
import NetworkManagementEntry from "../../components/network-management-entry";
import { ApiHelper } from "../../helpers/api-helper";

const MyNodes = () => {
  const [nodeEntries, setNodeEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userAccount } = useContext(UserContext);

  useEffect(() => {
    (async function fetchData() {
      try {
        setError(null);
        setLoading(true);
        setNodeEntries([]);

        const body = ApiHelper.getSignedPayload(userAccount.loginSignedData, userAccount.loginSignedResult, { userAddress: userAccount.userAddress });
        const { data } = await axios.post("/node/search", body);
        setNodeEntries(data);
        setLoading(false);
      }
      catch(e) {
        setLoading(false);
        setError(e);
      }
    })()
  }, []);

  return (
    <>
      <Head>
        <title>Iotex Nodes | Management - My Nodes</title>
      </Head>
      <div>
        { nodeEntries.map((result: any) => {
          return (
            <>
              <div key={result.id}>
                <NetworkManagementEntry result={result} userAccount={userAccount} showApprove={false} showEdit={true} />
              </div>
            </>
          )
        })}
        {!error && !loading && nodeEntries.length == 0 && 
          <Row>
            <Col>
              <div className="Network-Management-Entry center-text">
                <div className="Node-List__center-text">
                  You don't have any nodes!
                </div>
                <div>
                  Let's go ahead and submit your first node.
                </div>
                <div className="Node-List__plus-circle">
                  <a href='submit-node'>
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        }
      </div>
      <div className="Nodes-Owned-List">
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
    </>
  );
}

MyNodes.Layout = ManagementLayout;

export default MyNodes;

