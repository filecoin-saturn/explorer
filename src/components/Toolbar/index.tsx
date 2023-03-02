import './index.css'
import { useContext, useEffect, useState } from 'react'

import Search from './Search'
import ToolbarButton from '../ToolbarButton'
import AppContext, { ViewMode } from '../../contexts/AppContext'


type ViewModeButtonsProps = {
  viewMode: ViewMode | undefined,
  setViewMode: (viewMode: ViewMode | undefined) => void
}

const ViewModeButtonsMobile = ({ viewMode, setViewMode }: ViewModeButtonsProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  const handleClick = (mode: ViewMode) => {
    if (mode === viewMode) {
      if(isCollapsed) {
        setIsCollapsed(false)
        return;
      }
    }
    setViewMode(mode)
    setIsCollapsed(true)
  }

  const groupClassName = `Toolbar-buttonsGroup ${isCollapsed && 'collapsed'}`

  return (
    <div className={groupClassName}>
      <div className={`Toolbar-button ${viewMode === ViewMode.Density && 'active'}`}>
        <ToolbarButton
          isActive={viewMode === ViewMode.Density}
          onClick={() => handleClick(ViewMode.Density)}
          iconName={'Nodes'}
          title={'Density'}
          subtitle={ViewMode.Density} />
      </div>
      <div className={`Toolbar-button ${viewMode === ViewMode.Cluster && 'active'}`}>
        <ToolbarButton
          isActive={viewMode === ViewMode.Cluster}
          onClick={() => handleClick(ViewMode.Cluster)}
          iconName={'Nodes'}
          title={'Nodes'}
          subtitle={ViewMode.Cluster} /></div>
      <div className={`Toolbar-button ${viewMode === ViewMode.Heatmap && 'active'}`}>
        <ToolbarButton
          isActive={viewMode === ViewMode.Heatmap}
          onClick={() => handleClick(ViewMode.Heatmap)}
          iconName={'Load'}
          title={'Load'}
          subtitle={ViewMode.Heatmap} />
      </div>
    </div>
  )
}


const ViewModeButtonsWeb = ({ viewMode, setViewMode }: ViewModeButtonsProps) => {
  
  const handleClick = (mode: ViewMode) => {
    if (mode === viewMode) {
      setViewMode(ViewMode.Density)
      return;
    }
    setViewMode(mode)
  }
  
  return (
    <div className="Toolbar-buttonsGroup">
      <div className="Toolbar-button">
        <ToolbarButton
          isActive={viewMode === ViewMode.Cluster}
          onClick={() => handleClick(ViewMode.Cluster)}
          iconName={'Nodes'}
          title={'Nodes'}
          subtitle={ViewMode.Cluster} /></div>
      <div className="Toolbar-button">
        <ToolbarButton
          isActive={viewMode === ViewMode.Heatmap}
          onClick={() => handleClick(ViewMode.Heatmap)}
          iconName={'Load'}
          title={'Load'}
          subtitle={ViewMode.Heatmap} />
      </div>
    </div>
  )
}



export const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleWindowSize = () => {
    const width = window.innerWidth
    setIsMobile(width <= 768)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSize);
    return () => window.removeEventListener('resize', handleWindowSize)
  }, [])


  const renderButtons = () => {
    return isMobile
      ? <ViewModeButtonsMobile viewMode={viewMode} setViewMode={setViewMode} />
      : <ViewModeButtonsWeb viewMode={viewMode} setViewMode={setViewMode} />
  }

  return (
    <nav className="Toolbar">
      <Search />
      {renderButtons()}
    </nav>
  )
}

export default Toolbar

