import { ReactSVG } from "react-svg";

export type IconProps = { name: string, className: string }

export const Icon = ({ name, className }: IconProps) => {
  return (
    <ReactSVG
      src={`assets/icons/${name}.svg`}
      beforeInjection={(svg: any) => {
        svg.classList.add(className);
      }}
    />
  )
}

export default Icon
