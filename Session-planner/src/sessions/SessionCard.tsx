import { Button, Card, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

function SessionCard(props: { id: number, title: string, description: string }) {
    const navigate = useNavigate()

    const handleViewDetails = () => {
        navigate(`/session/${props.id}`)
    }

    return (
        <Card className="w-96 p-4 flex flex-col h-full">
            <div className="flex-grow">
                <Typography variant="h2" className="text-xl font-bold mb-2">{props.title}</Typography>
                <Typography variant="p" className="text-gray-600">{props.description}</Typography>
            </div>
            <div className="mt-4">
                <Button className="w-full" variant="gradient" onClick={handleViewDetails}>
                    View Details
                </Button>
            </div>
        </Card>
    )
}

export default SessionCard