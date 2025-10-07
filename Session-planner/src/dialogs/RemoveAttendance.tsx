import { Fragment, useState, type SetStateAction } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { AttendanceActionDialogProps } from "../types";
import { API_URL } from "../config/api";
import MessageDialog from "./MessageDialog";

function RemoveAttendance(props: AttendanceActionDialogProps) {
    const [removeCode, setRemoveCode] = useState("");
    const [message, setMessage] = useState("");
    const [showMessageDialog, setShowMessageDialog] = useState(false);

        const handleRemoveAttendance = async () => {
        try {
            const res = await fetch(`${API_URL}/sessions/${props.sessionId}/attendance`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: removeCode }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Invalid code");
                return;
            }

            const data = await res.json();

            setMessage(data.message || "Successfully removed!");
            setShowMessageDialog(true);
            props.setOpen(false);
            setRemoveCode("");
            props.onRefresh();

        } catch (err: any) {
            setMessage("Error: " + err.message);
            setShowMessageDialog(true);
        }
    };

    return (
        <>
            <Dialog open={props.open} onClose={() => props.setOpen(false)} as={Fragment}>
                <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Typography variant="h5" className="text-gray-700 mb-4">
                            Enter Your Attendance Code
                        </Typography>

                        <Input
                            label="Attendance Code"
                            value={removeCode}
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setRemoveCode(e.target.value)}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <Button color="red" variant="text" onClick={() => props.setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="green" onClick={handleRemoveAttendance}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <MessageDialog
                message={message}
                showMessageDialog={showMessageDialog}
                setShowMessageDialog={setShowMessageDialog}
            />
        </>
    )
}

export default RemoveAttendance