import SessionCard from "./SessionCard"

function getSessions() {
    // Fetch TODO
    const sessions = [
        {
            id: 1,
            title: "Morning Workout",
            description: "High intensity cardio and strength training",
            date: "2024-06-01",
            time: "08:00"
        },
        {
            id: 2,
            title: "Team Meeting",
            description: "Weekly team sync and project updates",
            date: "2024-06-02",
            time: "14:00"
        },
        {
            id: 3,
            title: "Client Presentation",
            description: "Present Q4 results to stakeholders",
            date: "2024-06-03",
            time: "10:30"
        },
        {
            id: 4,
            title: "Code Review Session",
            description: "Review new feature implementations veeeeeeeeeery loooong because whyyy nooooooooot",
            date: "2024-06-04",
            time: "15:00"
        },
        {
            id: 5,
            title: "Training Workshop",
            description: "React and TypeScript best practices",
            date: "2024-06-05",
            time: "09:00"
        }
    ]

    return sessions
}

function SessionList() {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {getSessions().map(session => (
                <div key={session.id} className="flex">
                    <SessionCard id={session.id} title={session.title} description={session.description} />
                </div>
            ))}
        </div>
    )
}

export default SessionList