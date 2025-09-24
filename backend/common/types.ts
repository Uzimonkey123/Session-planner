export interface Session {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: 'public' | 'private';
    managementCode: string;
    attendance: string[];
}

export interface CreateSessionRequest {
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: 'public' | 'private';
}