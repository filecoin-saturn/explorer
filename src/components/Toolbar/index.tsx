import './index.css'
import { useContext } from 'react'

import Search from './Search'
import ToolbarButton from '../ToolbarButton'
import AppContext, { ViewMode } from '../../contexts/AppContext'

export const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext)

  return (
    <nav className="Toolbar">
      <Search />
      <div className="Toolbar-buttonsGroup">
        <div className="Toolbar-button">
          <ToolbarButton
            isActive={viewMode === ViewMode.Density}
            onClick={() => setViewMode(ViewMode.Density)}
            iconName={'Nodes'}
            title={'Nodes'}
            subtitle={ViewMode.Density} />
        </div>
        <div className="Toolbar-button">
          <ToolbarButton
            isActive={viewMode === ViewMode.Cluster}
            onClick={() => setViewMode(ViewMode.Cluster)}
            iconName={'Nodes'}
            title={'Nodes'}
            subtitle={ViewMode.Cluster} /></div>
        <div className="Toolbar-button">
          <ToolbarButton
            isActive={viewMode === ViewMode.Heatmap}
            onClick={() => setViewMode(ViewMode.Heatmap)}
            iconName={'Load'}
            title={'Load'}
            subtitle={ViewMode.Heatmap} />
        </div>
      </div>
    </nav>
  )
}

export default Toolbar

