import express from "express";
import { getSessions, getSession } from "../sessionFuncs/viewSessions.js";

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

export default router;