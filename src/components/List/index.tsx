import "./index.css";

import Stat from "../Stat";
import Icon from "../Icon";
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

  function getItemStats(listItem: any) {
    switch (listItem.type) {
      case EntityType.continent:
        return getStatsByContinentId(listItem.id);
      case EntityType.country:
        return getStatsByCountryId(listItem.id);
      case EntityType.location:
        return getStatsByLocationId(listItem.id);
      case EntityType.node:
        return getStatsByNodeId(listItem.id);
      default:
        return undefined;
    }
  }

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
        </div>
      </div>
      <ul className="List-content">
        {list.map((listItem: any) => {
          const listItemStats = getItemStats(listItem);

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
