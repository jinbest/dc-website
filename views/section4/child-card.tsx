import React from "react"
import config from "../../static/config.json"

type Props = {
  title: string
  flags: string[]
  tags: string[]
  content: string
}

const ChildCard = ({ title, flags, tags, content }: Props) => {
  const brandDark = config.general.colorPalle.brandDark

  return (
    <div className="child-card">
      <div className="flex align-center">
        <p className="card-title" style={{ color: brandDark }}>
          {title}
        </p>
        {flags.map((item: string, index: number) => {
          return <img key={index} src={item} alt={`flag-${index}`} />
        })}
      </div>
      <div className="flex align-center">
        {tags.map((item: string, index: number) => {
          return (
            <span key={index} className="card-tag">
              <p>{item}</p>
            </span>
          )
        })}
      </div>
      {content ? (
        <p className="card-content" style={{ color: brandDark }}>
          {content}
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ChildCard
