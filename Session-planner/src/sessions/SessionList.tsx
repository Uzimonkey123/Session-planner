import { useEffect, useState } from "react";
import SessionCard from "./SessionCard"
import type { SessionListProps } from "../types"
import { Typography } from "@material-tailwind/react";

function SessionList(props: { filter?: string }) {
    const [sessions, setSessions] = useState<SessionListProps[]>([]);
    const [filteredSessions, setFilteredSessions] = useState<SessionListProps[]>([]);
    const [showPastSessions, setShowPastSessions] = useState(false);

    // Fetch sessions on mount
    useEffect(() => {
        fetch("http://localhost:3000/sessions")
        .then((res) => res.json())
        .then((data) => setSessions(data))
        .catch((err) => console.error("Failed to fetch sessions:", err));
    }, []);

    // Filter sessions based on the filter prop
    useEffect(() => {
        setFilteredSessions(sessions.filter(session => 
            props.filter ? 
            session.title.toLowerCase().includes(props.filter.toLowerCase()) || 
            session.description.toLowerCase().includes(props.filter.toLowerCase()) ||
            session.date.includes(props.filter) : true
        ));
    }, [props.filter, sessions]);
    
    // Setup filters for date to separate cards
    const now = new Date();
    const upcomingSessions = filteredSessions.filter(session => new Date(session.date) >= now);
    const pastSessions = filteredSessions.filter(session => new Date(session.date) < now);

    return (
        <div className="p-4">
            <div className="flex flex-wrap justify-center gap-4">
                {upcomingSessions.map(session => (
                    <div key={session.id} className="flex">
                        <SessionCard 
                            id={session.id} 
                            title={session.title} 
                            description={session.description}
                            date={session.date}
                            maxParticipants={session.maxParticipants}
                            attendance={session.attendance}
                        />
                    </div>
                ))}
            </div>

            {pastSessions.length > 0 && (
                <div className="mt-8">
                    <div 
                        className="flex justify-center cursor-pointer border-t border-gray-300 py-4 hover:bg-gray-400"
                        onClick={() => setShowPastSessions(!showPastSessions)}
                    >
                        <Typography variant="h6" className="font-medium text-gray-300">
                            Past Sessions ({pastSessions.length})
                        </Typography>
                        <Typography variant="h6" className="font-medium text-gray-300 ml-2">
                            {showPastSessions ? "▲" : "▼"}
                        </Typography>
                    </div>
                    
                    {showPastSessions && (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {pastSessions.map(session => (
                                <div key={session.id} className="flex">
                                    <SessionCard 
                                        id={session.id} 
                                        title={session.title} 
                                        description={session.description}
                                        date={session.date}
                                        maxParticipants={session.maxParticipants}
                                        attendance={session.attendance}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SessionList