import axios from "axios";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactFlagsSelect from '../forks/react-flag-select/components/ReactFlagsSelect/ReactFlagsSelect';
import NetworkEntry from "../components/network-entry";
import useScrollSearch from "../hooks/useBookSearch";

export default function NodesList() {
  // const [nodeEntries, setNodeEntries] = useState([]);
  const [primaryNode, setPrimaryNode] = useState(({} as any));

  const [query, setQuery] = useState(({} as any))
  const [pageNumber, setPageNumber] = useState(1)

  const { data, hasMore, loading, error } = useScrollSearch(query, pageNumber);
  
  const observer: any = useRef();
  const lastBookElementRef = useCallback(node => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    setPageNumber(1);
  }, [query]);

  useEffect(() => {
    (async function fetchData() {
      const { data } = await axios.get("/node-processed/primary")
      setPrimaryNode(data);
    })()
  }, []);

  return (
    <div>
      <Head>
        <title>Iotex Nodes | Nodes</title>
      </Head>
      <div className="content-container">
        <Container>
          <div className="Center-Content">
            <Row>
              <Col>
                <div className="Node-Header">
                  Network Block Height : { primaryNode.blockHeight }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="Node-List__search-criteria">
                  <ReactFlagsSelect
                      className="Form-Field__custom-field"
                      selected={ query.countryCode }
                      onSelect={code => setQuery(currentQuery => ({ ...currentQuery, countryCode: code }) )}
                      searchable
                    />
                  </div>
              </Col>
            </Row>
            {data.length > 0 && data.map((result: any, index) => {
              if (data.length === index + 1) {
                return (
                  <Row key={result.id} ref={lastBookElementRef}>
                    <Col>
                      <NetworkEntry result={result} ></NetworkEntry>
                    </Col>
                  </Row>
                )
              } else {
                return (
                  <Row key={result.id}>
                    <Col>
                      <NetworkEntry result={result} ></NetworkEntry>
                    </Col>
                  </Row>
                )
              }
            })}
            {!error && !loading && data.length == 0 && 
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
        </Container>
      </div>
    </div>
  );
}

