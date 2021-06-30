import React, { useState } from "react"
import config from "../data/config.json"
import _ from "lodash"
import { NavDataParams } from "../models/nav-data-params"
import HeaderDrawer from "./HeaderDrawer"

const Header = () => {
  const navData: NavDataParams[] = _.sortBy(config.header.navData, (o) => o.order)

  const [menuStatus, setMenuStatus] = useState(false)

  function toggleMenuStatus() {
    setMenuStatus(!menuStatus)
  }

  return (
    <div className="header">
      <div>
        <a href="#main">
          <img className="header-logo" src={config.header.logo.desktop} alt="header-logo" />
          <img
            className="header-logo-mobile"
            src={config.header.logo.mobile}
            alt="header-logo-mobile"
          />
        </a>
        <div className="header-nav-container">
          {navData.map((item: NavDataParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <a href={item.link}>
                    {item.name}
                    {item.icon ? <img src={item.icon} alt="nav-icon" /> : <></>}
                  </a>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <div className="header-drawer-button">
          <HeaderDrawer toggleMenuStatus={toggleMenuStatus}>
            {!menuStatus ? (
              <img src={config.header.drawer.menu} onClick={toggleMenuStatus} alt="menu-img" />
            ) : (
              <img src={config.header.drawer.cancel} onClick={toggleMenuStatus} alt="cancel-img" />
            )}
          </HeaderDrawer>
        </div>
      </div>
    </div>
  )
}

export default Header
