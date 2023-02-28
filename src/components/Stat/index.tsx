import "./index.css";

import { ReactNode } from "react";

type StatProps = {
  value?: ReactNode;
  units?: ReactNode;
  label?: ReactNode;
  small?: ReactNode;
};

export const Stat = ({ value, units, label, small }: StatProps) => {
  const className = `Stat ${small ? "small" : ""}`;

  return (
    <div className={className}>
      <div className="Stat-valueWrapper">
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
