import Icon from "../Icon";
import "./index.css";

type StatProps = {
  value?: string | number;
  units?: string;
  label?: string;
  small?: boolean;
  highlight?: boolean;
  icon?: string;
};

const byteUnits = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"];
const units = ["", "K", "M", "G", "T", "P"];
const time = ["ms", "s"];

const roundValue = (value: number, unit: string) => {
  let base;
  let scale;
  switch (unit) {
    case "ms":
      base = 1000;
      scale = time;
      break;
    case "bytes":
      base = 1024;
      scale = byteUnits;
      break;
    case "units":
      base = 1000;
      scale = units;
      break;
    case "Fil":
      base = 1000;
      scale = units;
      break;
    default:
      return [value, unit];
  }

  const magnitude = Math.log(value) / Math.log(base);
  const shortNumber = magnitude > 1.3;
  const power = Math.floor(magnitude);
  const roundedValue = shortNumber ? value / Math.pow(base, power) : value;
  const displayValue =
    unit === "ms"
      ? roundedValue.toFixed(0)
      : roundedValue % 1
      ? roundedValue.toFixed(1)
      : roundedValue;

  const scaleValue = shortNumber ? scale[power] : "";
  const scaleValueDisplay =
    unit === "Fil" ? scaleValue + "Fil" : unit === "ms" ? "ms" : scaleValue;

  return [displayValue, scaleValueDisplay];
};

export const Stat = ({
  value,
  units,
  label,
  small,
  highlight,
  icon,
}: StatProps) => {
  const className = `Stat ${small ? "small" : ""} ${
    highlight ? "highlight" : ""
  }`;

  const [roundedValue, roundedUnits] = value
    ? roundValue(parseFloat("" + value), units || "units")
    : [value, units];

  return (
    <div className={className}>
      <div className="Stat-content">
        <Icon name={`${icon}`} className="Stat-icon" />
        <p className="Stat-value">
          {roundedValue}
          {roundedUnits && (
            <span className="Stat-units">{" " + roundedUnits}</span>
          )}
        </p>
      </div>

      {label && <p className="Stat-label">{label}</p>}
    </div>
  );
};

export default Stat;
