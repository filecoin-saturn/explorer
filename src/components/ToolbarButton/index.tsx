import "./index.css";
import { Icon } from "../Icon";
import classnames from "classnames";

export type ToolbarButtonProps = {
  isActive: boolean;
  onClick: () => void;
  iconName: string;
  title: string;
  subtitle: string;
};

export const ToolbarButton = ({
  isActive,
  onClick,
  iconName,
  title,
  subtitle,
}: ToolbarButtonProps) => {
  const className = classnames("ToolbarButton", { active: isActive });
  return (
    <button className={className} onClick={onClick}>
      <Icon name={iconName} className={"ToolbarButton-icon"} />
      <div className="ToolbarButton-description">
        <div className="ToolbarButton-title">{title}</div>
        <div className="ToolbarButton-subtitle">{subtitle}</div>
      </div>
    </button>
  );
};

export default ToolbarButton;
