import { EntityType, NavBarEntity } from "../../contexts/AppContext";
import Icon from "../Icon";
import "./index.css";

type BreadcrumbProps = {
  name?: string;
  active?: boolean;
  trim?: boolean;
  onClick?: () => void;
  entity: NavBarEntity;
};

export const Breadcrumb = ({
  name,
  active,
  onClick,
  entity,
  trim,
}: BreadcrumbProps) => {
  let icon = "";
  const breadcrumbClassName = `Breadcrumb ${active ? "active" : ""}`;

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

  const computeDisplayName = () => {
    if (!entity) return "";
    const name = entity.name;
    if (name.length < 14 || !trim) return name;
    return name.substring(0, 15) + "...";
  };

  return (
    <button onClick={onClick} className={breadcrumbClassName}>
      <Icon name={icon} className="Breadcrumb-icon" />
      <div className="Breadcrumb-name">{computeDisplayName()}</div>
    </button>
  );
};

export default Breadcrumb;
