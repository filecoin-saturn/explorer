import { useContext } from 'react'
import AppContext from '../../contexts/AppContext'
import './index.css'
import Search from './Search'
import ViewModeButton from './ViewMode'
import { ViewMode } from '../../contexts/AppContext'


const Toolbar = () => {
  const { viewMode, setViewMode } = useContext(AppContext)

  return (
    <nav>
      <Search />
      <ViewModeButton
        isActive={viewMode === ViewMode.Cluster}
        onClick={() => setViewMode(ViewMode.Cluster)}
        iconPath={''}
        title={ViewMode.Cluster}
        description={ViewMode.Cluster} />
      <ViewModeButton
        isActive={viewMode === ViewMode.Heatmap}
        onClick={() => setViewMode(ViewMode.Heatmap)}
        iconPath={''}
        title={ViewMode.Heatmap}
        description={ViewMode.Heatmap} />
    </nav>
  )
}

export default Toolbar