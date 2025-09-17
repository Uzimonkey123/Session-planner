import './App.css'
import HomeNavbar from './Navbar.tsx'
import SessionList from './sessions/SessionList.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <HomeNavbar />
	  
      <Routes>
        <Route path="/" element={
			<>

				<SessionList />
			</>
        } />
      </Routes>
    </>
  )
}

export default App
