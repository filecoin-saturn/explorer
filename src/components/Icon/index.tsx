import { ReactSVG } from "react-svg";

export type IconProps = { iconPath: string, className: string }

export const Icon = ({ iconPath, className }: IconProps) => {
  return (
    <ReactSVG
      src={`/assets/${iconPath}.svg`}
      beforeInjection={(svg: any) => {
        svg.classList.add(className);
      }}
    />
  )
}

export default Icon
