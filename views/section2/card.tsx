import React from "react"

type Props = {
  title: string
  content: string
  img: string
}

const Card = ({ title, content, img }: Props) => {
  return (
    <div className="section2-card">
      <img src={img} alt={img} />
      <p className="card-title">{title}</p>
      <p className="card-content">{content}</p>
    </div>
  )
}

export default Card
