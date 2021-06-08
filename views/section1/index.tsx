import React, { useState } from "react"
import Shape from "./shape"
import config from "../../static/config.json"
import { Grid } from "@material-ui/core"
import CustomButton from "../../components/CustomButton"

const Section1 = () => {
  const bg = config.general.colorPalle.bg1,
    brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford
  const thisPage = config.main.section1

  const [value, setValue] = useState("")

  return (
    <div className="section1" style={{ background: bg }}>
      <Shape />
      <Grid container spacing={2} className="section1-container">
        <Grid item xs={12} md={6}>
          <p className="main-title section1-title" style={{ color: brandOxford }}>
            {thisPage.title}
          </p>
          <p className="main-content section1-content" style={{ color: brandDark }}>
            {thisPage.content}
          </p>
          <div className="flex align-center justify-between">
            <input
              value={value}
              className="custom-input"
              placeholder="Enter your email address"
              onChange={(e) => {
                setValue(e.target.value)
              }}
            />
            <CustomButton text={thisPage.button.text} iconName={thisPage.button.iconName} />
          </div>
          <p className="main-content section1-content" style={{ color: brandDark }}>
            {thisPage.entering}&nbsp;
            <span>terms of service</span>&nbsp; and&nbsp;
            <span>privacy policy.</span>
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <img className="section1-asset" src={thisPage.img} alt="section1-asset" />
        </Grid>
      </Grid>
    </div>
  )
}

export default Section1
