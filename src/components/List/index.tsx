import "./index.css";

import Stat from "../Stat";
import Icon from "../Icon";
import BarChart from "../BarChart/BarChart";
import { EntityType, NavBarEntity } from "../../contexts/AppContext";
import { Nodes } from "../../hooks/useNodes";
import { Continent } from "../../hooks/useContinents";
import { Location } from "../../hooks/useLocations";
import { Country } from "../../hooks/useCountries";

type ListProps = {
  stats: any;
  list: Nodes | Location[] | Country[] | Continent[];
  entity: NavBarEntity;
  toggleNavbar?: () => void;
  onSelect: (item: any) => () => void;
  hoverEnd: () => void;
  hoverStart: (item: any) => () => void;
};

export const List = ({
  list,
  entity,
  stats,
  toggleNavbar,
  onSelect,
  hoverEnd,
  hoverStart,
}: ListProps) => {
  const iconNameForItem = (item: any) => {
    switch (item.type) {
      case EntityType.world:
        return "../regions/world";
      case EntityType.continent:
        return `../regions/${item.name.toLowerCase()}`;
      case EntityType.country:
        return `../regions/${item.id.toLowerCase()}`;
      case EntityType.location:
        return `../regions/city`;
      default:
        return "nodes";
    }
  };

  return (
    <div className="List">
      <div className="List-header">
        <div className="List-title" onClick={toggleNavbar}>
          <Icon className="List-icon" name={iconNameForItem(entity)} />
          <p className="List-heading">{entity?.name}</p>
          <div className="List-mainStat">
            <Stat icon="nodes-green" value={2324} label="Nodes" />
          </div>
        </div>
        <div className="List-stats">
          <Stat icon="retrievals" value={1244} label="Retrievals" />
          <Stat icon="ttfb" value={194} units="ms" label="Avg TTFB" />
          <Stat icon="fil" value={124.35} label="$87.08" />
          <div className="List-chart">
            <BarChart
              dataset={[
                { date: "01/02/2023", earnings: 1 },
                { date: "02/02/2023", earnings: 31 },
                { date: "03/02/2023", earnings: 54 },
                { date: "04/02/2023", earnings: 3 },
                { date: "05/02/2023", earnings: 22 },
                { date: "06/02/2023", earnings: 11 },
                { date: "07/02/2023", earnings: 9 },
                { date: "08/02/2023", earnings: 9 },
                { date: "09/02/2023", earnings: 9 },
                { date: "10/02/2023", earnings: 40 },
                { date: "11/02/2023", earnings: 40 },
                { date: "12/02/2023", earnings: 40 },
                { date: "13/02/2023", earnings: 40 },
              ]}
            />
          </div>
          <div className="List-buttons">
            <button className="List-button">7d</button>
            <button className="List-button">30d</button>
            <button className="List-button">6 m</button>
            <button className="List-button">YTD</button>
          </div>
        </div>
      </div>
      <ul className="List-content">
        {list.map((listItem: any) => (
          <li
            key={listItem.id}
            className="List-item"
            onPointerLeave={hoverEnd}
            onClick={onSelect(listItem)}
            onPointerEnter={hoverStart(listItem)}
          >
            <div className="List-itemHeader">
              <Icon
                className="List-itemIcon"
                name={iconNameForItem(listItem)}
              />
              <p className="List-itemName">{listItem.name}</p>
            </div>
            <div className="List-itemStats">
              <Stat small icon="nodes-green" value={2324} label="Nodes" />
              <Stat small icon="ttfb" value={194} units="ms" label="Avg TTFB" />
              <Stat
                small
                icon="space"
                value={1450}
                units="GB"
                label="Bandwidth"
              />
              <Stat small icon="retrievals" value={1244} label="Retrievals" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
