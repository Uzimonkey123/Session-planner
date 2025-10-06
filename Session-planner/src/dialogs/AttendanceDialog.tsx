import { Fragment } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { AttendanceDialogProps } from "../types";
import { useParams } from "react-router-dom";

function AttendanceDialog(props: AttendanceDialogProps) {
    const { id } = useParams();

    const handleRemove = async (attendeeCode: string) => {
        try {
            const res = await fetch(`http://localhost:3000/sessions/${id}/attendance`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: attendeeCode }),
            });

            if (!res.ok) throw new Error("Failed to remove attendee");

            const data = await res.json();
            alert(data.message || "Attendee removed successfully");

            props.onRefresh();

        } catch (err: any) {
            alert("Error: " + err.message);
        }
    };

    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} as={Fragment}>
            <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <Typography variant="h5" className="text-gray-700 mb-4">
                        Attendees:
                    </Typography>
                    
                    {props.attendee && props.attendee.length > 0 ? (
                        <ul className="space-y-2">
                            {props.attendee.map((attendee, index) => (
                                <li key={index} className="p-2 bg-gray-100 rounded flex items-center justify-between">
                                    <Typography variant="h6" className="text-gray-700">
                                        {attendee.name}
                                    </Typography>

                                    <Button 
                                        color="red" 
                                        size="sm"
                                        onClick={() => handleRemove(attendee.code)}
                                    >
                                        Remove
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="h6" className="text-gray-700">
                            No attendees yet
                        </Typography>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                        <Button color="blue" onClick={() => props.setOpen(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default AttendanceDialog