import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// File setup to read sessions data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "..", "sessions.json");

function loadSessions() {
	// Check file existence
	if (!fs.existsSync(DATA_FILE)) {
		return []
	};
	
	return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

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