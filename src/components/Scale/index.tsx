import "./index.css";

type ScaleValue = {
  step: string;
  label: string;
};

type ScaleProps = {
  higher: ScaleValue;
  lower: ScaleValue;
};

const colors = [`#00FFD1`, `#00C0EA`, `#003F9E`, `#00164F`];

export const Scale = ({ higher, lower }: ScaleProps) => {
  return (
    <div className="Scale">
      <div className="Scale-label">
        <p className="Scale-step">{higher.step}</p>
        <p className="Scale-stepLabel">
          {">"} {higher.label}
        </p>
      </div>
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 216"
        className="Scale-graphic"
      >
        <path
          d="M24 16.343C24 27.026 18.627 216 12 216S0 27.026 0 16.343C0 5.66 5.373 0 12 0s12 5.66 12 16.343Z"
          fill="url(#a)"
        />
        <defs>
          <linearGradient
            id="a"
            x1="12"
            y1="0"
            x2="12"
            y2="216"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color={colors[0]} />
            <stop offset=".299" stop-color={colors[1]} />
            <stop offset=".726" stop-color={colors[2]} />
            <stop offset="1" stop-color={colors[3]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="Scale-label">
        <p className="Scale-step">{lower.step}</p>
        <p className="Scale-stepLabel">
          {"<"} {lower.label}
        </p>
      </div>
    </div>
  );
};

export default Scale;
