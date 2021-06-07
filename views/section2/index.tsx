import React from "react"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import _ from "lodash"
import Card from "./card"
import { Sec2IconDataParams } from "../../models/sec2-icon-data-params"

const Section2 = () => {
  const bg = config.general.colorPalle.bg2,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford,
    thisPage = config.main.section2

  const iconData: Sec2IconDataParams[] = _.sortBy(thisPage.icons, (o) => o.order)

  return (
    <div className="section2" style={{ background: bg }}>
      <div className="section2-container">
        <div className="section2-topic">
          <img src={thisPage.topic.img} alt="section2-flag" />
          <p className="main-content" style={{ color: brandOxford }}>
            {thisPage.topic.text}
          </p>
        </div>
        <p className="main-title section2-title" style={{ color: brandOxford }}>
          {thisPage.title}
        </p>
        <p className="main-content section2-content" style={{ color: brandDark }}>
          {thisPage.content}
        </p>
        <Grid container spacing={3} className="section2-card-container">
          {iconData.map((item: Sec2IconDataParams, index: number) => {
            return (
              <React.Fragment key={index}>
                {item.visible ? (
                  <Grid item xs={12} md={3}>
                    <Card title={item.title} content={item.content} img={item.img} />
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

export default Section2
