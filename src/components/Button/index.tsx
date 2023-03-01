import { FC } from "react"
import { ReactSVG } from "react-svg";

interface IButton {
  isActive: boolean,
  onClick: () => void,
  iconPath: string,
  title: string,
  description: string
}

const Button: FC<IButton> = ({ isActive, onClick, iconPath, title, description }) => {
  
  let className = `Button ${isActive ? "active" : ""}`;
  return (
    <div className={className}
      onClick={onClick}>
      <ReactSVG
        src={iconPath}
        beforeInjection={(svg) => {
          svg.classList.add("Button-icon");
        }}
      />
      <div className="Button-title">{title}</div>
      <div className="Button-description">{description}</div>
    </div>
  )
}

export default Button