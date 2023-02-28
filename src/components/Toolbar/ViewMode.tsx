import { FC } from "react"

interface IViewModeButton {
  isActive: boolean,
  onClick: () => void,
  iconPath: string,
  title: string,
  description: string
}

const ViewModeButton: FC<IViewModeButton> = ( {isActive, onClick, iconPath, title, description} ) => {
  let className = `ViewModeButton ${isActive ? "active" : ""}`;
  return (
    <div className={className}
      onClick={onClick}>
      <div className="ViewModeButton-icon" data-src={iconPath} />
      <div className="ViewModeButton-title">{title}</div>
      <div className="ViewModeButton-description">{description}</div>
    </div>
  )
}

export default ViewModeButton