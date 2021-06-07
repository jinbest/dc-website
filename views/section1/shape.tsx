import React from "react"
import config from "../../static/config.json"

const Shape = () => {
  return (
    <div
      className="section1-shape"
      style={{ backgroundImage: "url(" + config.main.section1.bgImg + ")" }}
    />
  )
}

export default Shape
