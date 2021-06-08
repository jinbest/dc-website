import React from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import { Sec4ChildCardParams, Sec4ChildParams } from "../../models/sec4-child-params"
import ChildCard from "./child-card"

const Section4 = () => {
  const bg = config.general.colorPalle.bg1,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section4

  const children: Sec4ChildParams[] = _.sortBy(thisPage.children, (o) => o.order)

  return (
    <div className="section4" style={{ background: bg }} id="partners">
      <div className="section4-container">
        <p className="main-title section4-title" style={{ color: brandOxford }}>
          {thisPage.title}
        </p>
        <div>
          {children.map((item: Sec4ChildParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <div className="child-card-container">
                    <p className="sub-title sec4-subtitle" style={{ color: brandOxford }}>
                      {item.title}
                    </p>
                    <Grid container spacing={2}>
                      {_.sortBy(item.data, (o) => o.order).map(
                        (it: Sec4ChildCardParams, idx: number) => {
                          return (
                            <React.Fragment key={`${index}-${idx}`}>
                              {it.visible ? (
                                <Grid item xs={12} md={item.display === 1 ? 6 : 4}>
                                  <ChildCard
                                    title={it.title}
                                    flags={it.flags}
                                    tags={it.tags}
                                    content={it.content}
                                  />
                                </Grid>
                              ) : (
                                <></>
                              )}
                            </React.Fragment>
                          )
                        }
                      )}
                    </Grid>
                  </div>
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

export default Section4
