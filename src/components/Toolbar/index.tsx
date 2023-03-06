import "./index.css";
import { useContext, useEffect, useState } from "react";

import Search from "../Search";
import ToolbarButton from "../ToolbarButton";
import AppContext, { ViewMode } from "../../contexts/AppContext";

const toolbarOptions = [
  { viewMode: ViewMode.Density, iconName: "nodes", title: "Density" },
  { viewMode: ViewMode.Cluster, iconName: "nodes", title: "Cluster" },
  { viewMode: ViewMode.Heatmap, iconName: "load", title: "Load" },
];

type ViewModeButtonsProps = {
  viewMode: ViewMode | undefined;
  setViewMode: (viewMode: ViewMode | undefined) => void;
};

const ViewModeButtonsMobile = ({
  viewMode,
  setViewMode,
}: ViewModeButtonsProps) => {
  
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  
  const enabledViewMode = toolbarOptions.find((e) => e.viewMode === viewMode);
  const disabledViewModes = toolbarOptions.filter(
    (opt) => opt !== enabledViewMode
  );

  const handleClick = (mode: ViewMode) => {
    if (mode === viewMode && isCollapsed) {
      setIsCollapsed(false);
      return;
    }
    setViewMode(mode);
    setIsCollapsed(true);
  };

  const groupClassName = `Toolbar-buttonsGroup mobile ${isCollapsed && "collapsed"}`;
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
    <div className="Toolbar-buttonsGroup web">
      {toolbarOptions.map((option) => {
        if (option.viewMode !== ViewMode.Density) {
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
        }
        return <></>;
      })}
    </div>
  );
};

export const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext);
  
  useEffect(() => {
    console.log(viewMode)
  })

  return (
    <nav className="Toolbar">
      <div className="Toolbar-search">
        <Search />
      </div>
      <ViewModeButtonsMobile viewMode={viewMode} setViewMode={setViewMode} />
      <ViewModeButtonsWeb viewMode={viewMode} setViewMode={setViewMode} />
    </nav>
  );
};

export default Toolbar;
