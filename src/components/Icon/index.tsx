import { ReactSVG } from "react-svg";

export const Icon = ({ name, className} : {name: string, className: string}) => {
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
