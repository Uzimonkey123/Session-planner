import express from "express";
import { getSessions, getSession } from "../sessionFuncs/viewSessions.js";
import { createSession, verifyManagementCode, deleteSession, editSession } from "../sessionFuncs/manageSessions.js";
import { addAttendance, deleteAttendance } from "../sessionFuncs/manageAttendance.js";

const router = express.Router();

router.get("/", (req, res) => {
    const sessions = getSessions();
    res.json(sessions);
});

router.get("/:id", (req, res) => {
    console.log(req.params.id, req.query.code);
    
    const result = getSession(req.params.id, req.query.code as string);
    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }

    res.json(result.data);
});

router.post("/create", async (req, res) => {
    const result = await createSession(req.body);

    res.status(result.status).json(result.data);
});

router.delete("/:id", (req, res) => {
    const result = deleteSession(req.params.id);

    res.status(result.status).json(result.data);
});

router.put("/:id", (req, res) => {
    const result = editSession(req.params.id, req.body);

    res.status(result.status).json(result.data);
});

router.post("/:id/management-code", (req, res) => {
    const result = verifyManagementCode(req.params.id, req.body.code);

    res.status(result.status).json(result.data);
});

router.post("/:id/attendance", async (req, res) => {
    const result = await addAttendance(req.params.id, req.body.name, req.body.email);

    res.status(result.status).json(result.data);
});

router.delete("/:id/attendance", (req, res) => {
    const result = deleteAttendance(req.params.id, req.body.code);

    res.status(result.status).json(result.data);
});

export default router;
