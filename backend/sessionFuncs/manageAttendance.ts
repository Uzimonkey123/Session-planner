import { Attendee, Session } from "../common/types";
import { loadSessions, saveSessions } from "../common/utils";

function getAttendeeCode(): string {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `attd-${randomNumbers}`;
}

export function addAttendance(id: string, name: string) {
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

    const code = getAttendeeCode();
    const attendee: Attendee = { name: name.trim(), code };

    sessions[index].attendance.push(attendee);

    if (sessions[index].attendance.length > sessions[index].maxParticipants) {
        return {
            status: 400,
            data: {
                error: "Session is full"
            }
        };
    }

    saveSessions(sessions);

    return {
        status: 200,
        data: {
            message: "Attendee added successfully",
            code
        }
    };
}

export function deleteAttendance(id: string, code: string) {
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

    const attendeeIndex = sessions[index].attendance.findIndex((a: Attendee) => a.code === code);
    if (attendeeIndex === -1) {
        return {
            status: 404,
            data: {
                error: "Attendee not found"
            }
        };
    }

    sessions[index].attendance.splice(attendeeIndex, 1);
    saveSessions(sessions);

    return {
        status: 200,
        data: {
            message: "Attendance deleted successfully"
        }
    };
}