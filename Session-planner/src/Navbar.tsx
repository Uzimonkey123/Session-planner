import { Input } from "@material-tailwind/react"
import { Button } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

function HomeNavbar(props: { filter: string, setFilter: (filter: string) => void }) {
    const navigate = useNavigate();

    const handleCreateSession = () => {
        navigate("/create");
    }

    return (
        <div 
            className="fixed left-0 top-0 z-50 h-screen bg-gradient-to-b from-gray-300 to-gray-700"
        >
            <div className="px-6 py-6 border-b border-gray-900">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Session Planner
                </h1>
                <p className="text-gray-900 text-sm">
                    Manage your hobbies
                </p>
            </div>

            <div className="flex h-full flex-col">
                <div className="px-4 pt-4 pb-4">
                    <Input type="text" label="Search sessions" className="text-gray-900"  
                        value={props.filter} 
                        onChange={(e: { target: { value: string; }; }) => props.setFilter(e.target.value)} 
                    />
                </div>

              <nav className="flex-1 px-2">
                    <Button
                        variant="text"
                        className={`w-full justify-start mb-2 px-4 py-3 rounded-lg text-white transition-all ${
                            location.pathname === "/" 
                                ? "bg-gray-700 shadow-md" 
                                : "hover:bg-gray-900"
                        }`}
                        onClick={() => navigate("/")}
                    >
                        <span className="flex items-center gap-3">
                            <span className="font-medium">Home</span>
                        </span>
                    </Button>

                    <Button
                        variant="text"
                        className={`w-full justify-start px-4 py-3 rounded-lg text-white transition-all ${
                            location.pathname === "/create" 
                                ? "bg-gray-700 shadow-md" 
                                : "hover:bg-gray-900"
                        }`}
                        onClick={() => handleCreateSession()}
                    >
                        <span className="flex items-center gap-3">
                            <span className="font-medium">Create Session</span>
                        </span>
                    </Button>
                </nav>
            </div>
        </div>
    )
}

export default HomeNavbar