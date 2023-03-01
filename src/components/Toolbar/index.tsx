import './index.css'
import { useContext, useState, useEffect } from 'react'

import Search from './Search'
import ToolbarButton from '../ToolbarButton'
import AppContext, { ViewMode } from '../../contexts/AppContext'

const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext)
  const [isMobile, setIsMobile] = useState<Boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])
 
  return (
    <nav className="Toolbar">
      <Search />
      <div className='Toolbar-buttons'>
        {isMobile &&
          <ToolbarButton
            isActive={viewMode === ViewMode.Density}
            onClick={() => setViewMode(ViewMode.Density)}
            iconName={'Nodes'}
            title={'Nodes'}
            subtitle={ViewMode.Density} />
        }
        <ToolbarButton
          isActive={viewMode === ViewMode.Cluster}
          onClick={() => setViewMode(ViewMode.Cluster)}
          iconName={'Nodes'}
          title={'Nodes'}
          subtitle={ViewMode.Cluster} />
        <ToolbarButton
          isActive={viewMode === ViewMode.Heatmap}
          onClick={() => setViewMode(ViewMode.Heatmap)}
          iconName={'Load'}
          title={'Load'}
          subtitle={ViewMode.Heatmap} />
      </div>
    </nav>
  )
}

export default Toolbar

