import "./index.css";
import Icon from "../Icon";

type LogoProps = { className: string };

export const Logo = ({ className }: LogoProps) => {
  return <Icon name="saturn" className={className} />;
};

export default Logo;
