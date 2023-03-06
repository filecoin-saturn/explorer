import "./index.css";
import { ReactSVG } from "react-svg";

type LogoProps = { className: string };

export const Logo = ({ className }: LogoProps) => {
  return (
    <ReactSVG
      src={`assets/icons/saturn.svg`}
      beforeInjection={(svg: any) => {
        svg.classList.add(className);
      }}
    />
  );
};

export default Logo;
