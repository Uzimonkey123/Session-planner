import { Button, Card, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import type { SessionListProps } from "../types"

function SessionCard(props: SessionListProps) {
    const navigate = useNavigate()

    const handleViewDetails = () => {
        navigate(`/session/${props.id}`)
    }

    // Get the current number of participants
    const participantsCount = props.attendance.length;

    return (
        <>
            <Card className="w-96 p-4 flex flex-col h-full">
                <div className="flex-grow">
                    <Typography variant="h2" className="text-xl font-bold mb-2">{props.title}</Typography>
                    <Typography variant="h6" className="text-gray-600">{props.description}</Typography>
                    <Typography variant="h6" className="text-gray-600">
                        Participants: {participantsCount}/{props.maxParticipants}
                    </Typography>
                </div>
                <div className="mt-4">
                    <Button className="w-full" variant="gradient" onClick={handleViewDetails}>
                        View Details
                    </Button>
                </div>
            </Card>
        </>
    )
}

export default SessionCard