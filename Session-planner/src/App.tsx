import './App.css'
import { Typography } from '@material-tailwind/react'
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
				<Typography variant="h1" className="mt-12 mb-6 text-center text-6xl font-extrabold text-blue-600">
					Session Planner
				</Typography>

				<SessionList />
			</>
        } />
      </Routes>
    </>
  )
}

export default App
