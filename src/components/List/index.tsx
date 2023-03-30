import "./index.css";

import Stat from "../Stat";
import Icon from "../Icon";
import { EntityType, NavBarEntity } from "../../contexts/AppContext";
import { Node, Nodes } from "../../hooks/useNodes";
import { Continent } from "../../hooks/useContinents";
import { Location } from "../../hooks/useLocations";
import { Country } from "../../hooks/useCountries";
import { LocationStat, useStats } from "../../hooks/useStats";
import { useEffect, useState } from "react";
import classNames from "classnames";
import useAppContext from "../../hooks/useAppContext";

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
  const [timeFrame] = useState<TimeFrame>("7d");
  const [selectedNode, setSelectedNode] = useState<Node>();

  const {
    getStatsByContinentId,
    getStatsByCountryId,
    getStatsByLocationId,
    getStatsByNodeId,
  } = useStats();
  const { hoverEntity } = useAppContext();

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

  useEffect(() => {
    setSelectedNode(undefined);
  }, [entity]);

  const getItemStats = (listItem: any) => {
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
  };

  const handleClick = (e: EventTarget, listItem: NavBarEntity) => {
    if (!listItem) return;
    if (listItem.type !== EntityType.node) {
      onSelect(listItem)();
    } else {
      setSelectedNode(listItem);
    }
  };

  const sortedList = list.sort((a, b) => {
    let statsA: any;
    let statsB: any;
    switch (a.type) {
      case EntityType.continent:
        statsA = getStatsByContinentId(a.id)?.numberOfNodes || 0;
        statsB = getStatsByContinentId(b.id)?.numberOfNodes || 0;
        return statsB - statsA;
      case EntityType.country:
        statsA = getStatsByCountryId(a.id)?.numberOfNodes || 0;
        statsB = getStatsByCountryId(b.id)?.numberOfNodes || 0;
        return statsB - statsA;
      case EntityType.location:
        statsB = getStatsByLocationId(b.id)?.numberOfNodes || 0;
        statsA = getStatsByLocationId(a.id)?.numberOfNodes || 0;
        return statsB - statsA;
      default:
        return 0;
    }
  });

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
            icon="ttfb"
            value={stats?.avgTTFB}
            units="ms"
            label="Avg TTFB"
          />
          <Stat
            icon="load-green"
            units="Gb"
            value={stats?.bandwidthServed[timeFrame]}
            label="Bandwidth"
          />
          <Stat
            icon="retrievals"
            units="M"
            value={stats?.retrievals[timeFrame]}
            label="Retrievals"
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
        {sortedList.map((listItem: any) => {
          const listItemStats = getItemStats(listItem);
          const isActive = selectedNode === listItem;
          const className = classNames("List-item", {
            active: isActive,
            hover: hoverEntity?.id === listItem.id,
          });

          return (
            <li>
              <button
                key={listItem.id}
                className={className}
                onPointerLeave={hoverEnd}
                onClick={(e) => handleClick(e.target, listItem)}
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
                    small={!isActive}
                    icon="nodes-green"
                    value={listItemStats?.numberOfNodes}
                    label="Nodes"
                  />
                  <Stat
                    small={!isActive}
                    icon="ttfb"
                    value={listItemStats?.avgTTFB}
                    units="ms"
                    label="Avg TTFB"
                  />
                  <Stat
                    small={!isActive}
                    icon="space"
                    value={listItemStats?.bandwidthServed[timeFrame]}
                    units="GB"
                    label="Bandwidth"
                  />
                  <Stat
                    small={!isActive}
                    icon="retrievals"
                    units="M"
                    value={listItemStats?.retrievals[timeFrame]}
                    label="Retrievals"
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
