import Icon from "../Icon";
import "./index.css";

type BreadcrumbProps = {
  continent?: string;
  code?: string;
  city?: string;
  name?: string;
  active?: boolean;
  onClick?: any;
};

export const Breadcrumb = ({
  continent,
  code,
  city,
  name,
  active,
  onClick,
}: BreadcrumbProps) => {
  const className = `Breadcrumb ${active ? "active" : ""}`;

  let icon = "world";

  if (continent && code && !city) {
    icon = `${continent.toLowerCase()}/${code.toLowerCase()}`;
  } else if (city) {
    icon = "city";
  }

  return (
    <button onClick={onClick} className={className}>
      <Icon name={`../regions/${icon}`} className="Breadcrumb-icon" />
      {name}
    </button>
  );
};

export default Breadcrumb;
