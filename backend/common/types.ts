export interface Session {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: 'public' | 'private';
    managementCode: string;
    attendance: Attendee[];
}

export interface CreateSessionRequest {
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: 'public' | 'private';
    email: string;
}

export interface Attendee {
    name: string;
    code: string;
}