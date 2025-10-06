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
            style={{ height: '100%', margin: 0 }}
        >
            <div className="flex h-full flex-col">
                <div className="px-4 pt-4 pb-4">
                    <Input type="text" label="Search sessions"  
                        value={props.filter} 
                        onChange={(e: { target: { value: string; }; }) => props.setFilter(e.target.value)} 
                    />
                </div>

                <Button
                    variant="text"
                    className={`h-16 rounded-none p-2 text-white hover:bg-gray-400 ${
                        location.pathname === "/" ? "bg-gray-700" : ""
                    }`}
                    onClick={() => navigate("/")}
                >
                    <span>Home</span>
                </Button>

                <Button
                    variant="text"
                    className={`h-16 rounded-none p-2 text-white hover:bg-gray-400 ${
                        location.pathname === "/create" ? "bg-gray-700" : ""
                    }`}
                    onClick={handleCreateSession}
                >
                    <span>Create Session</span>
                </Button>
            </div>
        </div>
    )
}

export default HomeNavbar