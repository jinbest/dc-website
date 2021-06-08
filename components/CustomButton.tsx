import React from "react"

type Props = {
  text: string
  iconName?: string
  style?: any
  className?: string
}

const CustomButton = ({ text, iconName, style, className }: Props) => {
  return (
    <button className={`custom-button ${className ? className : ""}`} style={style ? style : {}}>
      <span className="button-text">{text}</span>
      {iconName ? (
        <span>
          <img src={`img/other/${iconName}.svg`} alt={`custom-button-${iconName}`} />
        </span>
      ) : (
        <></>
      )}
    </button>
  )
}

export default CustomButton
