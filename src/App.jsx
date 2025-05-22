import './App.css'
import { useEffect, useState } from 'react'
import Tracker from './components/Tracker/Tracker'
import Finder from './components/Finder/Finder'
import Journal from './components/Journal/Journal'

function App() 
{
  // State for active module and theme mode
  const [activeModule, setActiveModule] = useState('Tracker')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  // Effect to toggle dark mode class and save preference
  useEffect(() => {
    if (darkMode) 
    {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } 
    else 
    {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Render selected module component
  const renderModule = () => {
    switch (activeModule) {
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
      {/* Header with toggle button */}
      <header>
        <h1>LifeLog Dashboard</h1>
        <button onClick={() => setDarkMode(prev => !prev)} className="btn btn-primary">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {/* Module selection */}
      <div className="module-grid">
        <div className="module" onClick={() => setActiveModule('Tracker')}>
          Book Tracker
        </div>
        <div className="module" onClick={() => setActiveModule('Finder')}>
          TV Show Finder
        </div>
        <div className="module" onClick={() => setActiveModule('Journal')}>
          Journal
        </div>
      </div>

      {/* Display selected module */}
      <div className="module-content">
        {renderModule()}
      </div>
    </div>
  )
}

export default App
