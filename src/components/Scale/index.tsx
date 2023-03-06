import "./index.css";

type ScaleProps = {
  higher: ScaleValue;
  lower: ScaleValue;
};

type ScaleValue = {
  name: string;
  label: string;
  color: string;
};

export const Scale = ({ higher, lower }: ScaleProps) => {
  return (
    <div className="Scale-wrapper">
      <div className="Scale-label">
        <p className="Scale-step">{higher.name}</p>
        <p className="Scale-stepLabel">
          {">"} {higher.label}
        </p>
      </div>
      <div
        className="Scale"
        style={{
          background: `linear-gradient(to bottom, ${higher.color}, ${lower.color})`,
        }}
      />
      <div className="Scale-label">
        <p className="Scale-step">{lower.name}</p>
        <p className="Scale-stepLabel">
          {"<"} {lower.label}
        </p>
      </div>
    </div>
  );
};

export default Scale;
