import "./index.css";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export const Logo = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (isReady) return;
    setTimeout(() => setIsReady(true), 3000);
  }, []);
  const classname = isReady ? "Logo" : "Logo-load";
  return <Icon name="saturn" className={classname} />;
};

export default Logo;
