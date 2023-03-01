import './index.module.css'
import { useContext } from 'react'

import Search from './Search'
import ViewModeButton from './ViewModeButton'
import AppContext, { ViewMode } from '../../contexts/AppContext'



const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext)

  return (
    <nav className="Toolbar">
      <Search />
      <ViewModeButton
        isActive={viewMode === ViewMode.Cluster}
        onClick={() => setViewMode(ViewMode.Cluster)}
        iconPath={''}
        title={'Nodes'}
        description={ViewMode.Cluster} />
      <ViewModeButton
        isActive={viewMode === ViewMode.Heatmap}
        onClick={() => setViewMode(ViewMode.Heatmap)}
        iconPath={''}
        title={'Load'}
        description={ViewMode.Heatmap} />
    </nav>
  )
}

export default Toolbar