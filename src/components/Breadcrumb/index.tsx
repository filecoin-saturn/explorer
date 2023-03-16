import { EntityType, NavBarEntity } from "../../contexts/AppContext";
import Icon from "../Icon";
import "./index.css";

type BreadcrumbProps = {
  name?: string;
  active?: boolean;
  onClick?: () => void;
  entity: NavBarEntity;
};

export const Breadcrumb = ({
  name,
  active,
  onClick,
  entity,
}: BreadcrumbProps) => {
  let icon = "";
  const className = `Breadcrumb ${active ? "active" : ""}`;

  switch (entity?.type) {
    case EntityType.world:
      icon = "../regions/world";
      break;
    case EntityType.continent:
      icon = `../regions/${entity.name.toLowerCase()}`;
      break;
    case EntityType.country:
      icon = `../regions/${entity.id.toLowerCase()}`;
      break;
    case EntityType.location:
      icon = "../regions/city";
      break;
  }

  return (
    <button onClick={onClick} className={className}>
      <Icon name={icon} className="Breadcrumb-icon" />
      <div className="Breadcrumb-name">{entity?.name}</div>
    </button>
  );
};

export default Breadcrumb;
