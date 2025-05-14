import './App.css'

import Tracker from './components/Tracker/Tracker'
// import Finder from './components/Finder/Finder'
// import Notes from './components/Notes/Notes'

function App() 
{
  return (
    <div className="App">
      <h1>LifeLog Dashboard</h1>
      <Tracker />
      {/* <Finder />
      <Notes /> */}
    </div>
  )
}

export default App
