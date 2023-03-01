import { ReactNode } from "react";
import Icon from "../Icon";
import "./index.css";

type StatProps = {
  value?: string | number;
  units?: string;
  label?: string;
  small?: boolean;
  icon?: ReactNode;
};

export const Stat = ({ value, units, label, small, icon }: StatProps) => {
  const className = `Stat ${small ? "small" : ""}`;

  return (
    <div className={className}>
      <div className="Stat-valueWrapper">
        <Icon name={`${icon}`} className="Stat-icon" />
        <p className="Stat-value">
          {value}
          {units && <span className="Stat-units">{units}</span>}
        </p>
      </div>

      {label && <p className="Stat-label">{label}</p>}
    </div>
  );
};

export default Stat;
