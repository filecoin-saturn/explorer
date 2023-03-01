import "./index.css";

import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
};

export const Card = ({ children }: CardProps) => {
  return <h2 className="Card-heading">{children}</h2>;
};

export default Card;
