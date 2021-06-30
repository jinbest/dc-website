import React from "react"

type Props = {
  text: string
  iconName?: string
  style?: any
  className?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  children?: any
  disable?: boolean
  type?: "button" | "submit" | undefined | "reset"
}

const CustomButton = ({
  text,
  iconName,
  style,
  className,
  onClick,
  children,
  disable,
  type,
}: Props) => {
  return (
    <button
      className={`custom-button ${className ? className : ""}`}
      style={style ? style : {}}
      onClick={onClick}
      disabled={disable}
      type={type ?? "button"}
    >
      {!children ? (
        <>
          <span className="button-text">{text}</span>
          {iconName ? (
            <span>
              <img src={`img/other/${iconName}.svg`} alt={`custom-button-${iconName}`} />
            </span>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export default CustomButton
