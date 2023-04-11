import "./index.css";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import useNodes from "../../hooks/useNodes";

export const Logo = () => {
  const { nodes } = useNodes();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (nodes.length === 0 || isReady) return;
    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);
  const classname = isReady ? "Logo" : "Logo-load";
  return <Icon name="saturn" className={classname} />;
};

export default Logo;
