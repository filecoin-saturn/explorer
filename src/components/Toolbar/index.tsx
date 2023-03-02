import "./index.css";
import { useContext, useEffect, useState } from "react";

import Search from "./Search";
import ToolbarButton from "../ToolbarButton";
import AppContext, { ViewMode } from "../../contexts/AppContext";

type ViewModeButtonsProps = {
  viewMode: ViewMode | undefined;
  setViewMode: (viewMode: ViewMode | undefined) => void;
};

const ViewModeButtonsMobile = ({
  viewMode,
  setViewMode,
}: ViewModeButtonsProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toolbarOptions = [
    { viewMode: ViewMode.Density, iconName: "Nodes", title: "Density" },
    { viewMode: ViewMode.Cluster, iconName: "Nodes", title: "Cluster" },
    { viewMode: ViewMode.Heatmap, iconName: "Load", title: "Load" },
  ];

  const enabledViewMode = toolbarOptions.find((e) => e.viewMode === viewMode);
  const disabledViewModes = toolbarOptions.filter((opt) => opt !== enabledViewMode);

  console.log(viewMode, enabledViewMode)

  const handleClick = (mode: ViewMode) => {
    if (mode === viewMode && isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setViewMode(mode);
    setIsCollapsed(true);
  };

  const groupClassName = `Toolbar-buttonsGroup ${isCollapsed && "collapsed"}`;
  return (
    <div className={groupClassName}>
      {enabledViewMode && (
        <div className={"Toolbar-button active"}>
          <ToolbarButton
            isActive={true}
            onClick={() => handleClick(enabledViewMode.viewMode)}
            iconName={enabledViewMode.iconName}
            title={enabledViewMode.title}
            subtitle={enabledViewMode.viewMode}
          />
        </div>
      )}
      {disabledViewModes.map((option) => {
        return (
          <div key={option.viewMode} className={"Toolbar-button"}>
            <ToolbarButton
              isActive={viewMode === option.viewMode}
              onClick={() => handleClick(option.viewMode)}
              iconName={option.iconName}
              title={option.title}
              subtitle={option.viewMode}
            />
          </div>
        );
      })}
    </div>
  );
};

const ViewModeButtonsWeb = ({
  viewMode,
  setViewMode,
}: ViewModeButtonsProps) => {
  const handleClick = (mode: ViewMode) => {
    if (mode === viewMode) {
      setViewMode(ViewMode.Density);
      return;
    }
    setViewMode(mode);
  };

  return (
    <div className="Toolbar-buttonsGroup">
      <div className="Toolbar-button">
        <ToolbarButton
          isActive={viewMode === ViewMode.Cluster}
          onClick={() => handleClick(ViewMode.Cluster)}
          iconName={"Nodes"}
          title={"Nodes"}
          subtitle={ViewMode.Cluster}
        />
      </div>
      <div className="Toolbar-button">
        <ToolbarButton
          isActive={viewMode === ViewMode.Heatmap}
          onClick={() => handleClick(ViewMode.Heatmap)}
          iconName={"Load"}
          title={"Load"}
          subtitle={ViewMode.Heatmap}
        />
      </div>
    </div>
  );
};

export const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowSize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);

  const renderButtons = () => {
    return isMobile ? (
      <ViewModeButtonsMobile viewMode={viewMode} setViewMode={setViewMode} />
    ) : (
      <ViewModeButtonsWeb viewMode={viewMode} setViewMode={setViewMode} />
    );
  };

  return (
    <nav className="Toolbar">
      <Search />
      {renderButtons()}
    </nav>
  );
};

export default Toolbar;
