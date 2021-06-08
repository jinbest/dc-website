import React from "react"
import config from "../../static/config.json"

type Props = {
  title: string
  icon: string
}

const ChildButton = ({ title, icon }: Props) => {
  const brandDark = config.general.colorPalle.brandDark

  return (
    <div className="child-button">
      <div>
        <img className="small-icon" src={icon} alt="small-icon" />
        <p style={{ color: brandDark }}>{title}</p>
      </div>
      <div>
        <img className="child-arrow-down" src="/img/other/arrow-down.svg" alt="arrow-down" />
      </div>
    </div>
  )
}

export default ChildButton
