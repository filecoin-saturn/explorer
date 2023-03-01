import "./index.css";

type StatProps = {
  value?: string | number;
  units?: string;
  label?: string;
  small?: boolean;
};

export const Stat = ({ value, units, label, small }: StatProps) => {
  const className = `Stat ${small ? "small" : ""}`;

  return (
    <div className={className}>
      <p className="Stat-value">
        {value}
        {units && <span className="Stat-units">{units}</span>}
      </p>

      {label && <p className="Stat-label">{label}</p>}
    </div>
  );
};

export default Stat;
