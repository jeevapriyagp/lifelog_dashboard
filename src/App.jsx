import './App.css'
import { useState } from 'react'
import Tracker from './components/Tracker/Tracker'
import Finder from './components/Finder/Finder'
import Journal from './components/Journal/Journal'

function App() 
{
  const [activeModule, setActiveModule] = useState('Tracker')

  const renderModule = () => {
    switch (activeModule) 
    {
      case 'Tracker':
        return <Tracker />
      case 'Finder':
        return <Finder />
      case 'Journal':
        return <Journal />
      default:
        return null
    }
  }

  return (
    <div className="App">
      <h1>LifeLog Dashboard</h1>
      <div className="module-grid">
        <div className="module" onClick={() => setActiveModule('Tracker')}>
          Tracker
        </div>
        <div className="module" onClick={() => setActiveModule('Finder')}>
          Finder
        </div>
        <div className="module" onClick={() => setActiveModule('Journal')}>
          Journal
        </div>
      </div>
      <div className="module-content">
        {renderModule()}
      </div>
    </div>
  )
}

export default App
