import "./index.css";

import { ReactNode } from "react";

import Stat from "../Stat";
import { EntityType } from "../../contexts/AppContext";
import Icon from "../Icon";

type ListProps = {
  list: any;
  name: any;
  stats: any;
};

export const List = ({ list, name, stats }: ListProps) => {
  return (
    <div className="List">
      <div className="List-header">
        <div className="List-heading">
          <Icon className="List-icon" name="../regions/world" />
          {name}
        </div>
        <Stat icon="nodes-green" value={2324} label="Nodes" />
        <div className="List-stats">
          <Stat icon="space" value={1450} units="GB" label="Bandwidth" />
          <Stat icon="retrievals" value={1244} label="Retrievals" />
          <Stat icon="ttfb" value={194} units="ms" label="Avg TTFB" />
          <Stat icon="fil" value={124.35} label="$87.08" />
        </div>
      </div>
      <ul className="List-content">
        {list.map((listItem: any) => (
          <li
            key={listItem.id}
            // onPointerLeave={hoverEnd}
            // onClick={selectEntity(listItem as NavBarEntity)}
            // onPointerEnter={hoverStart(listItem as HoverEntity)}
          >
            {listItem.type === EntityType.node ? listItem.id : listItem.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
