import "./index.css";

import { ReactNode } from "react";

type BreadcrumbProps = {
  children?: ReactNode;
  active?: ReactNode;
};

export const Breadcrumb = ({ children, active }: BreadcrumbProps) => {
  const className = `Breadcrumb ${active ? "active" : ""}`;

  return <p className={className}>{children}</p>;
};

export default Breadcrumb;
