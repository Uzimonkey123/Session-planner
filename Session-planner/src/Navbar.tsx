import { Button } from "@material-tailwind/react"

function HomeNavbar() {
    return (
        <div 
            className="sticky top-0 z-50 w-screen bg-gradient-to-r from-blue-gray-900 to-blue-gray-800 px-4 py-3"
            style={{ width: '100vw', margin: 0 }}
        >
            <div className="flex w-full items-center px-4 py-2">
                <Button
                    variant="text"
                    className="mr-4 hidden p-2 text-white hover:bg-transparent lg:inline-flex"
                >
                    <span>Create Session</span>
                </Button>
            </div>
        </div>
    )
}

export default HomeNavbar