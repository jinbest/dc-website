import React from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import { Sec3ChildParams, Sec3ChildButtonParams } from "../../models/sec3-child-params"
import ChildButton from "./child-button"

const Section3 = () => {
  const bg = config.general.colorPalle.bg1,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section3

  const children: Sec3ChildParams[] = _.sortBy(thisPage.children, (o) => o.order)

  return (
    <div className="section3" style={{ background: bg }} id="features">
      <div className="section3-container">
        <p className="main-title section3-title" style={{ color: brandOxford }}>
          {thisPage.title}
        </p>
        <p className="main-content section3-content" style={{ color: brandDark }}>
          {thisPage.content}
        </p>
        <div className="children-container">
          {children.map((item: Sec3ChildParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <Grid container spacing={2} className="children">
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="child-data"
                      style={{ order: 2 - item.direction }}
                    >
                      <img className="child-icon" src={item.icon} alt={`child-icon-${index}`} />
                      <p className="sub-title sec3-subtitle" style={{ color: brandOxford }}>
                        {item.title}
                      </p>
                      <div className="child-button-container">
                        {_.sortBy(item.data, (o) => o.order).map(
                          (it: Sec3ChildButtonParams, idx: number) => {
                            return (
                              <React.Fragment key={`${index}-${idx}`}>
                                {it.visible ? (
                                  <ChildButton title={it.title} icon={it.icon} />
                                ) : (
                                  <></>
                                )}
                              </React.Fragment>
                            )
                          }
                        )}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      className="child-img"
                      style={{ order: item.direction + 1 }}
                    >
                      <img src={item.img} alt={`child-img-${index}`} />
                    </Grid>
                  </Grid>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Section3
