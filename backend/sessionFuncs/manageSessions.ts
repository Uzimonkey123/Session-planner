import { CreateSessionRequest, Session } from "../common/types";
import { loadSessions, saveSessions } from "../common/utils";

function getPrivateUrl(): string {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `private-${randomNumbers}`;
}

function getManagementCode(): string {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `mgmt-${randomNumbers}`;
}

// To get the upcoming ID for a new session
function getNextId(sessions: Session[]): string {
    return String(Math.max(0, ...sessions.map(s => Number(s.id))) + 1);
}

export function createSession(sessionData: CreateSessionRequest) {
    // Generate mgmt code and unique ID to new session
    const sessions = loadSessions();
    const sessionId = getNextId(sessions);
    const managementCode = getManagementCode();
    let accessCode = "";

    if (sessionData.type === "private") {
        accessCode = getPrivateUrl();
    }
    
    const newSession: Session = {
        id: sessionId,
        title: sessionData.title.trim(),
        description: sessionData.description.trim(),
        date: sessionData.date.trim(),
        time: sessionData.time.trim(),
        maxParticipants: sessionData.maxParticipants,
        type: sessionData.type,
        managementCode,
        attendance: [],
        ...(sessionData.type === "private" && { accessCode: accessCode })
    };

    sessions.push(newSession);
    saveSessions(sessions);

    const { managementCode: _, ...sessionResponse } = newSession;

    if (sessionData.type === "private") {
        return {
            data: {
                message: 'Private session created successfully, your management code is: ' + managementCode 
                + ' and access code is: localhost:5173/session/' + newSession.id + '?code=' + accessCode,
            },
            status: 201
        };
    }
    
    return {
        data: {
            message: 'Session created successfully, your management code is: ' + managementCode
        },
        status: 201
    };
}

export function deleteSession(id: string) {
    const sessions = loadSessions();
    const index = sessions.findIndex((s: Session) => s.id === id);

    if (index === -1) {
        return {
            status: 404,
            data: { 
                error: "Session not found" 
            }
        };
    }

    sessions.splice(index, 1)[0];
    saveSessions(sessions);

    return {
        status: 200,
        data: { 
            message: "Session deleted successfully"
        }
    };
}

export function editSession(id: string, updates: Partial<CreateSessionRequest>) {
    const sessions = loadSessions();
    const index = sessions.findIndex((s: Session) => s.id === id);

    if (index === -1) {
        return {
            status: 404,
            data: {
                error: "Session not found" 
            }
        };
    }

    sessions[index] = {
        ...sessions[index],
        ...updates,
        title: updates.title?.trim() ?? sessions[index].title,
        description: updates.description?.trim() ?? sessions[index].description,
        date: updates.date?.trim() ?? sessions[index].date,
        time: updates.time?.trim() ?? sessions[index].time,
    };

    saveSessions(sessions);

    return {
        status: 200,
        data: { 
            message: "Session updated successfully"
        }
    };
}

export function verifyManagementCode(id: string, code: string) {
    const sessions = loadSessions();
    const session = sessions.find((s: { id: string; }) => s.id === id);

    if (!session) {
        return {
            status: 404,
            data: { 
                valid: false, 
                error: "Session not found" 
            }
        };
    }

    if (session.managementCode === code) {
        return {
            status: 200,
            data: { 
                valid: true 
            }
        };
    }

    return {
        status: 401,
        data: { 
            valid: false, 
            error: "Invalid management code" 
        }
    };
}