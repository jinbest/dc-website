import React from "react"
import config from "../../data/config.json"

type Props = {
  title: string
  subTitle: string
  content: string
}

const ChildCard = ({ title, subTitle, content }: Props) => {
  const brandDark = config.general.colorPalle.brandDark,
    brandOxford = config.general.colorPalle.brandOxford

  return (
    <div className="child-card">
      <div className="flex align-center">
        <div className="avatar"></div>
        <div>
          <p className="card-title" style={{ color: brandOxford }}>
            {title}
          </p>
          <p className="card-subtitle" style={{ color: brandDark }}>
            {subTitle}
          </p>
        </div>
      </div>
      <p className="card-content" style={{ color: brandDark }}>
        {content}
      </p>
    </div>
  )
}

export default ChildCard
