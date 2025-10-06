import { Fragment, useState, type SetStateAction } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { AttendanceActionDialogProps } from "../types";

function AddAttendance(props: AttendanceActionDialogProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showMessageDialog, setShowMessageDialog] = useState(false);

    const handleAddAttendance = async () => {
        try {
            const res = await fetch(`/sessions/${props.sessionId}/attendance`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            setMessage(data.message || "Successfully added!");
            setShowMessageDialog(true);
            props.setOpen(false);
            setName("");
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
                            Enter Your Name
                        </Typography>

                        <Input
                            label="Name"
                            value={name}
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
                        />

                        <Input
                            label="Email"
                            value={email}
                            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <Button color="red" variant="text" onClick={() => props.setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="green" onClick={handleAddAttendance}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog open={showMessageDialog} onClose={() => setShowMessageDialog(false)} as={Fragment}>
                <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Typography variant="h6" className="text-gray-700 mb-4">
                            {message}
                        </Typography>

                        <div className="flex justify-end">
                            <Button color="blue" onClick={() => setShowMessageDialog(false)}>
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default AddAttendance