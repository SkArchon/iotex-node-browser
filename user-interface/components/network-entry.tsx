import { faFacebookF, faTelegramPlane, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'
import ReactCountryFlag from "react-country-flag"
import { BadgeMapping } from '../constants/badge.enum'

const NetworkEntry = ({result}) => {
  const indicatorClass = classNames({
    'Status-Circle': true,
    'Status-Circle--down': result.lastAttemptedPingTimestamp > result.lastKnownUpTimestamp
  });

  const heightOutdatedClass = classNames({
    'Network-Entry__highlights__more__value': true,
    'Network-Entry__highlights__more__value--down-status': result.outdated
  });

  return (
    <div className="Network-Entry">
      <div className="Network-Entry__highlights">
        <div className="Network-Entry__highlights__main">
          <div className="Network-Entry__highlights__main__copy" onClick={() => {navigator.clipboard.writeText(result.address)}}>
            <FontAwesomeIcon icon={faCopy} />
          </div>
          <div className="Network-Entry__highlights__main__details">
            <div className="Network-Entry__highlights__main__details__name">
              { result.name }
            </div>
            <div className="Network-Entry__highlights__main__details__address">
              { result.address }
            </div>
            </div>
        </div>
        <div className="Network-Entry__highlights__more">
          <div>
            <div className="Network-Entry__highlights__more__uptime">
              <span className="Network-Entry__highlights__more__label">uptime </span>
              <span className="Network-Entry__highlights__more__value">
                { result.uptimePercentage.toFixed(2) }%
                <span className={indicatorClass}></span>
              </span>
            </div>
            <div className="Network-Entry__highlights__more__height">
              <span className="Network-Entry__highlights__more__label">height </span>
              <span className={heightOutdatedClass}>{ result.blockHeight }</span>
            </div>
            </div>
        </div>
      </div>
      <div className="Network-Entry__more">
        <div className="Network-Entry__more__details">
          <div className="Network-Entry__more__details__wrapper">
            <span className="Network-Entry__more__details__wrapper__entry">
              <div className="Network-Entry__more__details__label">version </div>
              <div className="Network-Entry__more__details__value">{ result.packageVersion }</div>
            </span>
            <span className="Network-Entry__more__details__wrapper__entry">
              <div className="Network-Entry__more__details__label">response </div>
              <div className="Network-Entry__more__details__value">{ result.responseTime }ms</div>
            </span>
            { result.nodeCountry &&
              <span className="Network-Entry__more__details__wrapper__entry">
                <div className="Network-Entry__more__details__label">location </div>
                <div className="Network-Entry__more__details__value">
                  <ReactCountryFlag countryCode={ result.nodeCountry } svg />
                  { result.nodeCity && 
                    <span className="Network-Entry__more__details__value__city">{ result.nodeCity }</span>
                  }
                </div>
              </span>
            }
          </div>
        </div>
        <div className="Network-Entry__more__social">
          { result.badges.map(result => (
              <span className="badge" key={result}>{BadgeMapping[result]}</span>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default NetworkEntry;

