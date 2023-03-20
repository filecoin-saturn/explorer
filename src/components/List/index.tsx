import "./index.css";

import Stat from "../Stat";
import Icon from "../Icon";
import BarChart from "../BarChart/BarChart";
import { EntityType, NavBarEntity } from "../../contexts/AppContext";
import { Nodes } from "../../hooks/useNodes";
import { Continent } from "../../hooks/useContinents";
import { Location } from "../../hooks/useLocations";
import { Country } from "../../hooks/useCountries";
import { LocationStat, useStats } from "../../hooks/useStats";
import { useState } from "react";

type ListProps = {
  stats: LocationStat | undefined;
  list: Nodes | Location[] | Country[] | Continent[];
  entity: NavBarEntity;
  toggleNavbar?: () => void;
  onSelect: (item: any) => () => void;
  hoverEnd: () => void;
  hoverStart: (item: any) => () => void;
};

type TimeFrame = "1d" | "7d";

export const List = ({
  list,
  entity,
  stats,
  toggleNavbar,
  onSelect,
  hoverEnd,
  hoverStart,
}: ListProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("7d");
  const {
    getStatsByContinentId,
    getStatsByCountryId,
    getStatsByLocationId,
    getStatsByNodeId,
  } = useStats();

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
            <Stat
              icon="nodes-green"
              value={stats?.numberOfNodes}
              label="Nodes"
            />
          </div>
        </div>
        <div className="List-stats">
          <Stat
            icon="retrievals"
            units="M"
            value={stats?.retrievals[timeFrame]}
            label="Retrievals"
          />
          <Stat
            icon="ttfb"
            value={stats?.avgTTFB}
            units="ms"
            label="Avg TTFB"
          />
          <Stat
            icon="fil"
            units="FIL"
            value={stats?.estimatedEarnings[timeFrame]}
            label="Earnings" // fil -> $
          />
          {/* <div className="List-chart">
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
          </div> */}
          <div className="List-buttons">
            <button className="List-button" onClick={() => setTimeFrame("1d")}>
              1d
            </button>
            <button className="List-button" onClick={() => setTimeFrame("7d")}>
              7d
            </button>
          </div>
        </div>
      </div>
      <ul className="List-content">
        {list.map((listItem: any) => {
          let listItemStats;
          switch (listItem.type) {
            case EntityType.continent:
              listItemStats = getStatsByContinentId(listItem.id);
              break;
            case EntityType.country:
              listItemStats = getStatsByCountryId(listItem.id);
              break;
            case EntityType.location:
              listItemStats = getStatsByLocationId(listItem.id);
              break;
            case EntityType.node:
              listItemStats = getStatsByNodeId(listItem.id);
              break;
            default:
              break;
          }

          return (
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
                <Stat
                  small
                  icon="nodes-green"
                  value={listItemStats?.numberOfNodes}
                  label="Nodes"
                />
                <Stat
                  small
                  icon="ttfb"
                  value={listItemStats?.avgTTFB}
                  units="ms"
                  label="Avg TTFB"
                />
                <Stat
                  small
                  icon="space"
                  value={listItemStats?.bandwidthServed[timeFrame]}
                  units="GB"
                  label="Bandwidth"
                />
                <Stat
                  small
                  icon="retrievals"
                  units="M"
                  value={listItemStats?.retrievals[timeFrame]}
                  label="Retrievals"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
