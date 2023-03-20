import { url } from "inspector";
import { ReactSVG } from "react-svg";

export type IconProps = { name: string; className: string };

const checkAssetExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const Icon = ({ name, className }: IconProps) => {
  return (
    <ReactSVG
      src={`${process.env.PUBLIC_URL}/assets/icons/${name}.svg`}
      beforeInjection={(svg: any) => {
        svg.classList.add(className);
      }}
    />
  );
};

export default Icon;
