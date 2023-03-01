import "./index.css";
import { Icon } from "../Icon";

export type ToolbarButtonProps = {
  isActive: boolean,
  onClick: () => void,
  iconName: string,
  title: string,
  subtitle: string
}

export const ToolbarButton = ( {isActive, onClick, iconName, title, subtitle} : ToolbarButtonProps ) => {
  let className = `ToolbarButton ${isActive ? "active" : ""}`;
  return (
    <div className={className}
      onClick={onClick}>
      <Icon name={iconName} className={'ToolbarButton-icon'} />
      <div className="ToolbarButton-description">
        <div className="ToolbarButton-title">{title}</div>
        <div className="ToolbarButton-subtitle">{subtitle}</div>
      </div>
    </div>
  )
}

export default ToolbarButton
