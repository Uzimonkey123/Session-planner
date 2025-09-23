import { loadSessions } from "../common/utils";

export function getSessions() {
	// Return only public sessions
	return loadSessions().filter((s: any) => s.type === "public");
}

export function getSession(id: string, code?: string) {
	const sessions = loadSessions();
	const session = sessions.find((s: any) => s.id === id);

	if (!session) return { error: "Session not found", status: 404 };

	// If the code doesnt match for the private session, deny
	if (session.type === "private" && code !== session.accessCode) {
		return { error: "Access denied", status: 403 };
	}

	return { data: session, status: 200 };
}