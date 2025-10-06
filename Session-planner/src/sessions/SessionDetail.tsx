import { useEffect, useState } from "react";
import type { SessionDetailProps } from "../types"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Typography }  from "@material-tailwind/react";
import ManagementCode from "../dialogs/ManagementCode";
import AttendanceDialog from "../dialogs/AttendanceDialog";
import ActionDialog from "../dialogs/ActionDialog";

function SessionDetail() {
    const { id } = useParams();
    const [session, setSession] = useState<SessionDetailProps | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState("");
    const [accessCode, setAccessCode] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [open, setOpen] = useState(false);
    const [attendeesOpen, setAttendeesOpen] = useState(false);
    const [attendanceActionsOpen, setAttendanceActionsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // In case of private session, try searching for code in url, if not found, consider public
        const code = searchParams.get("code");
        const url = `http://localhost:3000/sessions/${id}${code ? `?code=${code}` : ""}`;
        setAccessCode(code ? code : "");
            
        fetch(url)
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((err) => setErrorMsg(err.message));
    }, [searchParams]);

    // Function to verify management code
    const verifyCode = async () => {
        try {
            const res = await fetch(`http://localhost:3000/sessions/${id}/management-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            if (!res.ok) throw new Error("Invalid code");

            const data = await res.json();
            if (data.valid) {
                setIsAuthorized(true);
                setErrorMsg(null);
            } else {
                setErrorMsg("Invalid management code");
            }

        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    // Delete the session completely
    const deleteSession = async () => {
        try {
            const res = await fetch(`http://localhost:3000/sessions/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete session");

            const data = await res.json();

            alert(data.message);
            navigate("/");

        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    const fetchSession = () => {
        const url = `http://localhost:3000/sessions/${id}${accessCode ? `?code=${accessCode}` : ""}`;
        
        fetch(url)
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((err) => setErrorMsg(err.message));
    };

    if (errorMsg) {
        return <div>Error: {errorMsg}</div>;
    }

    return (
        <>
            <div className="mt-4">
                <Typography variant="h1">{session?.title}</Typography>
                <Typography variant="h5">{session?.description}</Typography>
                <br />
                <Typography variant="h5">Date: {session?.date}</Typography>
                <Typography variant="h5">Time: {session?.time}</Typography>
                <Typography variant="h5">
                    Number of participants: {session?.attendance.length}/{session?.maxParticipants}
                </Typography>
            </div>

            {!isAuthorized ? (
                <>
                    <div className="mt-4 space-x-2">
                        <Button color="blue" onClick={() => setOpen(true)}>
                            Manage Session
                        </Button>

                        <Button color="blue" onClick={() => setAttendanceActionsOpen(true)}>
                            Attendance
                        </Button>

                        <ManagementCode 
                            open={open} 
                            setOpen={setOpen} 
                            code={code} 
                            setCode={setCode} 
                            onVerify={verifyCode}
                        />

                        <ActionDialog
                            open={attendanceActionsOpen}
                            setOpen={setAttendanceActionsOpen}
                            sessionId={id || ""}
                            onRefresh={fetchSession}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-4 space-x-2">
                    <Button 
                        color="red" 
                        onClick={deleteSession}
                    >
                        Delete Session
                    </Button>

                    <Button 
                        color="blue" 
                        onClick={() => navigate(`/sessions/${id}/edit${accessCode ? `?code=${accessCode}` : ""}`)}
                    >
                        Edit Session
                    </Button>

                    <Button 
                        color="green" 
                        onClick={() => setAttendeesOpen(true)}
                    >
                        List Attendees
                    </Button>

                    <AttendanceDialog
                        open={attendeesOpen}
                        setOpen={setAttendeesOpen}
                        attendee={session?.attendance || []}
                    />
                </div>
            )}
        </>
    );
}

export default SessionDetail