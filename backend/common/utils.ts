import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Session } from "../common/types";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "..", "sessions.json");

export function loadSessions() {
    // Check file existence
    if (!fs.existsSync(DATA_FILE)) {
        return []
    };
    
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

export function saveSessions(sessions: Session[]): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(sessions, null, 2));
}