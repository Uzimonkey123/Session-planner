import { useEffect, useState } from "react";
import type { SessionDetailProps } from "../types"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, Typography, Card, CardBody }  from "@material-tailwind/react";
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

            setOpen(false);

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

    if (!session) {
        return <div>Loading...</div>
    }

    let canJoin = true;
    const isFull = session.attendance.length >= session.maxParticipants;
    const isPast = new Date(session.date) < new Date();

    if (isFull || isPast) {
        canJoin = false;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="shadow-xl">
                <CardBody>
                    <div className="mb-6">
                        <Typography variant="h2" className="mb-3 text-gray-900">
                            {session!.title}
                        </Typography>

                        <div className="flex gap-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                session.type === "private" 
                                    ? "bg-orange-100 text-orange-800" 
                                    : "bg-green-100 text-green-800"
                            }`}>
                                {session.type}
                            </span>
                        </div>
                    </div>

                    <Typography variant="paragraph" className="text-gray-700 mb-6 text-lg">
                        {session.description}
                    </Typography>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 rounded-lg border border-black">
                            <Typography variant="small" className="text-gray-600 mb-1">
                                Date
                            </Typography>

                            <Typography variant="h6" className="text-gray-900">
                                {new Date(session.date).toLocaleDateString()}
                            </Typography>
                        </div>

                        <div className="p-4 rounded-lg border border-black">
                            <Typography variant="small" className="text-gray-600 mb-1">
                                Time
                            </Typography>

                            <Typography variant="h6" className="text-gray-900">
                                {session.time}
                            </Typography>
                        </div>

                        <div className="p-4 rounded-lg border border-black">
                            <Typography variant="small" className="text-gray-600 mb-1">
                                Participants
                            </Typography>

                            <Typography variant="h6" className="text-gray-900">
                                {session.attendance.length}/{session.maxParticipants}
                            </Typography>
                        </div>
                    </div>

                    {!isAuthorized ? (
                        <div className="flex flex-wrap gap-3">
                            <Button 
                                color="blue" 
                                onClick={() => setOpen(true)}
                                size="lg"
                            >
                                Manage Session
                            </Button>

                            <Button 
                                color="green" 
                                onClick={() => setAttendanceActionsOpen(true)}
                                size="lg"
                                disabled={isPast}
                            >
                                Attendance
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            <Button 
                                color="blue" 
                                onClick={() => navigate(`/sessions/${id}/edit${accessCode ? `?code=${accessCode}` : ""}`)}
                                size="lg"
                            >
                                Edit Session
                            </Button>

                            <Button 
                                color="green" 
                                onClick={() => setAttendeesOpen(true)}
                                variant="outlined"
                                size="lg"
                            >
                                View Attendees ({session.attendance.length})
                            </Button>

                            <Button 
                                color="red" 
                                onClick={deleteSession}
                                variant="outlined"
                                size="lg"
                            >
                                Delete Session
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>

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
                canJoin={canJoin}
            />

            <AttendanceDialog
                open={attendeesOpen}
                setOpen={setAttendeesOpen}
                attendee={session.attendance || []}
            />
        </div>
    );
}

export default SessionDetail;