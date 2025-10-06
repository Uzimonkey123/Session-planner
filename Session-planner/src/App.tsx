import './App.css'
import { Typography } from '@material-tailwind/react'
import HomeNavbar from './Navbar.tsx'
import SessionList from './sessions/SessionList.tsx'
import { Route, Routes } from 'react-router-dom'
import SessionDetail from './sessions/SessionDetail.tsx'
import { useState } from 'react'
import CreateSession from './management/CreateSession.tsx'
import EditSession from './management/EditSession.tsx'

function App() {
	const [filter, setFilter] = useState<string>("");

  	return (
		<>
		<HomeNavbar filter={filter} setFilter={setFilter}/>
		
		<div className="ml-48">
			<Routes>
				<Route path="/" element={
					<>
						<Typography variant="h1" className="mt-12 mb-6 text-center text-6xl font-extrabold text-bg-gray-400">
							Session Planner
						</Typography>

						<SessionList filter={filter}/>
					</>
				} />
				<Route path="/session/:id" element={<SessionDetail />} />
				<Route path="/create" element={<CreateSession />} />
				<Route path="/sessions/:id/edit" element={<EditSession />} />
			</Routes>
		</div>
		</>
	)
}

export default App