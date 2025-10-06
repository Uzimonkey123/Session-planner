export interface SessionListProps {
    id: number;
    title: string;
    description: string;
    date: string;
    maxParticipants: number;
    attendance: { name: string; code: string }[];
}

export interface SessionDetailProps {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: string;
    attendance: { name: string; code: string }[];
}