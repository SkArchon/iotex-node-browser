import React from "react";
import { Col, Container, Row, Form as BootstrapForm } from 'react-bootstrap';
import Link from 'next/link';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DocumentationSwitcherProps { 
  leftUrl?: string; 
  leftLabel?: string;
  rightUrl?:any;
  rightLabel?: any;
}

export const DocumentationSwitcher = ({ leftUrl, leftLabel, rightUrl, rightLabel }: DocumentationSwitcherProps) => {

  return (
    <>
      <div className="Documentation-Switcher">
        <Row>
          { leftUrl &&
            <Col className="Documentation-Switcher__left">
              <Link href={ leftUrl }>
                <a>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span className="Documentation-Switcher__left__text">{ leftLabel }</span>
                </a>
              </Link>
            </Col>
          }
          { rightUrl &&
            <Col className="Documentation-Switcher__right">
              <Link href={ rightUrl }>
                <a>
                  <span className="Documentation-Switcher__right__text">{ rightLabel }</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </Link>
            </Col>
          }
        </Row>
      </div>
    </>
  );
}

