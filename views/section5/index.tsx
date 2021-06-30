import React from "react"
import config from "../../data/config.json"
import _ from "lodash"
import { Sec5ChildParams } from "../../models/sec5-child-params"
import ChildCard from "./child-card"
import { Grid } from "@material-ui/core"

const Section5 = () => {
  const bg = config.general.colorPalle.bg2,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section5

  const children: Sec5ChildParams[] = _.sortBy(thisPage.children, (o) => o.order)

  return (
    <div className="section5" style={{ background: bg }}>
      <div className="section5-container">
        <p className="main-title section5-title" style={{ color: brandOxford }}>
          {thisPage.title}
        </p>
        <Grid container spacing={3} className="children-container">
          {children.map((item: Sec5ChildParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <Grid item xs={12} md={4}>
                    <ChildCard title={item.title} subTitle={item.subTitle} content={item.content} />
                  </Grid>
                ) : (
                  <></>
                )}
              </React.Fragment>
            )
          })}
        </Grid>
      </div>
    </div>
  )
}

export default Section5
