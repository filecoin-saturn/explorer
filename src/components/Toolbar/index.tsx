import "./index.css";
import { useContext, useState } from "react";

import Search from "../Search";
import ToolbarButton from "../ToolbarButton";
import AppContext, { ViewMode } from "../../contexts/AppContext";

const toolbarOptions = [
  { viewMode: ViewMode.Cluster, iconName: "tb-nodes", title: "Cluster" },
  { viewMode: ViewMode.Heatmap, iconName: "tb-load", title: "Load" },
];

type ViewModeButtonsProps = {
  viewMode: ViewMode | undefined;
  toggleViewMode: () => void;
};

const ViewModeButtonsMobile = ({
  viewMode,
  toggleViewMode,
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
    if (viewMode !== mode) {
      toggleViewMode();
    }
    setIsCollapsed(true);
  };

  const groupClassName = `Toolbar-buttonsGroup mobile ${
    isCollapsed && "collapsed"
  }`;
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
  toggleViewMode,
}: ViewModeButtonsProps) => {
  const handleClick = (mode: ViewMode) => {
    if (mode !== viewMode) {
      toggleViewMode();
      return;
    }
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
        return null;
      })}
    </div>
  );
};

export const Toolbar = () => {
  const { viewMode, toggleViewMode } = useContext(AppContext);

  return (
    <nav className="Toolbar">
      <Search />
      <ViewModeButtonsMobile
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
      />
      <ViewModeButtonsWeb viewMode={viewMode} toggleViewMode={toggleViewMode} />
    </nav>
  );
};

export default Toolbar;
