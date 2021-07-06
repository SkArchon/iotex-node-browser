import { faFacebookF, faTelegramPlane, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiHelper } from "../helpers/api-helper";
import axios from "axios";
import { FAILURE_SNACKBAR, SUCCESS_SNACKBAR } from "../constants/common.constants";
import { useSnackbar } from 'react-simple-snackbar'
import { useEffect, useState } from "react";
import classNames from 'classnames'
import { DateTime } from "luxon";
import { useRouter } from "next/router";

const NetworkManagementEntry = ({result, userAccount, showApprove, showEdit }) => {  
  const [openSuccessSnackbar, closeSuccessSnackbar] = useSnackbar(SUCCESS_SNACKBAR);
  const [openFailureSnackbar, closeFailureSnackbar] = useSnackbar(FAILURE_SNACKBAR);

  const [currentStatus, updateStatus] = useState(result.status)
  const router = useRouter();

  const editNode = (nodeId) => {
    router.push({ pathname: 'submit-node', query: { id: nodeId }});
  }

  const approve = (approveMethod, nodeId) => {
    (async function approve() {
      const approveMethodAsMessage = (approveMethod === 'approve')
      ? 'approved'
      : 'rejected';
      
      try {
        await axios.post(`/node/${approveMethod}`, { nodeId });
        
        updateStatus(approveMethodAsMessage);
        openSuccessSnackbar(`The node was successfully ${approveMethodAsMessage}`);
      }
      catch(e) {
        openFailureSnackbar(`The node was unable to be ${approveMethodAsMessage}, please try again`);
      }
    })()
  };

  const statusClasses = classNames({
    'Network-Management-Entry__highlights__more__value': true,
    'Capitalize': true,
    'Text--success': currentStatus === 'approved',
    'Text--warning': currentStatus === 'pending',
    'Text--error': currentStatus === 'rejected'
  });

  return (
    <div className="Network-Management-Entry">
      <div className="Network-Management-Entry__highlights">
        <div className="Network-Management-Entry__highlights__main">
            <div className="Network-Management-Entry__highlights__main__details">
            <div className="Network-Management-Entry__highlights__main__details__name">
                { result.name }
            </div>
            <div className="Network-Management-Entry__highlights__main__details__address">
                { result.address }
            </div>
            </div>
        </div>
        <div className="Network-Management-Entry__highlights__more">
            <div className="Network-Management-Entry__highlights__more__uptime">
              <span className={statusClasses}>
                { currentStatus }
              </span>
            </div>
            <div className="Network-Management-Entry__highlights__more__height">
              <span className="Network-Management-Entry__highlights__more__value">{ DateTime.fromMillis(result.createdDate).toLocaleString(DateTime.DATE_MED) }</span>
            </div>
        </div>
      </div>
      <div className="Network-Management-Entry__more">
        <div className="Network-Management-Entry__more__details">
          <div className="Network-Management-Entry__more__details__social">
              { result.telegram && 
                <div className="Icon Icon--circle">
                  <a href={`https://t.me/${result.telegram}`} target="_blank">
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </a>
                </div>
              }
              { result.email && 
                <div className="Icon Icon--circle">
                  <a href={`mailto:${result.email}`}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </div>
              }
          </div>
        </div>
        <div className="Network-Management-Entry__more__badges">
        { (showApprove && userAccount.isAdmin) && 
          <>
            {(currentStatus !== 'rejected') &&
              <button className="Button Button--outline-primary btn btn-outline-primary" onClick={() => approve("reject", result.id)}>Reject</button>
            }
            {(currentStatus !== 'approved') &&
              <button className="Button Button--primary btn btn-primary" onClick={() => approve("approve", result.id)}>Approve</button>
            }
          </>
        }
        { showEdit && userAccount.userAddress === result.nodeOwnerAddress &&
          <button className="Button Button--primary btn btn-primary" onClick={() => editNode(result.id)}>Edit</button>
        }
        </div>
      </div>
    </div>
  );
}

export default NetworkManagementEntry;
