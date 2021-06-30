import React, { useState } from "react"
import Drawer from "@material-ui/core/Drawer"
import config from "../data/config.json"
import _ from "lodash"
import { NavDataParams } from "../models/nav-data-params"

type Anchor = "top" | "left" | "bottom" | "right"

interface Props {
  children?: any
  toggleMenuStatus: (val: boolean) => void
}

const HeaderDrawer = (props: Props) => {
  const { children, toggleMenuStatus } = props
  const navData: NavDataParams[] = _.sortBy(config.header.navData, (o) => o.order)

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
      toggleMenuStatus(open)
    }

  return (
    <React.Fragment>
      <div onClick={toggleDrawer("left", true)}>{children}</div>
      <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
        <div className="header-drawer-container">
          <a
            href="#main"
            onClick={() => {
              setState({ ...state, ["left"]: false })
              toggleMenuStatus(false)
            }}
          >
            <img
              className="header-drawer-logo"
              src={config.header.logo.desktop}
              alt="header-drawer-logo"
            />
          </a>
          <div className="header-drawer-nav-container">
            {navData.map((item: NavDataParams, index: number) => {
              return (
                <React.Fragment key={index}>
                  {item.visible ? (
                    <div
                      onClick={() => {
                        setState({ ...state, ["left"]: false })
                        toggleMenuStatus(false)
                      }}
                    >
                      <a href={item.link}>{item.name}</a>
                    </div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default HeaderDrawer
