import React from "react"
import config from "../static/config.json"
import _ from "lodash"
import { NavDataParams } from "../models/nav-data-params"

const Header = () => {
  const navData: NavDataParams[] = _.sortBy(config.header.navData, (o) => o.order)

  return (
    <div className="header">
      <div>
        <a href="#main">
          <img className="header-logo" src={config.header.logo} />
        </a>
        <div className="header-nav-container">
          {navData.map((item: NavDataParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? <a href={item.link}>{item.name}</a> : <></>}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
