import "./index.css";

import { ReactNode } from "react";

type ListProps = {
  children?: ReactNode;
};

export const List = ({ children }: ListProps) => {
  return <h2 className="List-heading">{children}</h2>;
};

export default List;
