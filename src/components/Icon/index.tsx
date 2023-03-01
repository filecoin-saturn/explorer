import { FC } from "react";
import { ReactSVG } from "react-svg";
import './index.module.tsx'

interface IIcon {
  iconName: string,
  iconClass: string
}

const Icon: FC<IIcon> = ({ iconName, iconClass}) => {
  return (
     <ReactSVG
        src={`assets/${iconName}.svg`}
        beforeInjection={(svg: any) => {
          svg.classList.add(iconClass);
        }}
      />
  )
}

export default Icon