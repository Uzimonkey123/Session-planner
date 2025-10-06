import { Fragment, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { AttendanceActionDialogProps } from "../types";
import AddAttendance from "./AddAttendance";
import RemoveAttendance from "./RemoveAttendance";

function ActionDialog({ open, setOpen, sessionId, onRefresh, canJoin }: AttendanceActionDialogProps) {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} as={Fragment}>
                <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Typography variant="h5" className="text-gray-700 mb-4">
                            Attendance Options
                        </Typography>

                        <div className="flex flex-col gap-3">
                            {canJoin && <Button 
                                color="green" 
                                onClick={() => {
                                    setOpen(false);
                                    setShowAddDialog(true);
                                }}
                            >
                                I am going!
                            </Button>}

                            <Button 
                                color="orange" 
                                onClick={() => {
                                    setOpen(false);
                                    setShowRemoveDialog(true);
                                }}
                            >
                                Remove my attendance
                            </Button>

                            <Button 
                                color="red" 
                                variant="text"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        
            <AddAttendance
                open={showAddDialog}
                setOpen={setShowAddDialog}
                sessionId={sessionId}
                onRefresh={onRefresh}
            />

            <RemoveAttendance
                open={showRemoveDialog}
                setOpen={setShowRemoveDialog}
                sessionId={sessionId}
                onRefresh={onRefresh}
            />
        </>
    );
}

export default ActionDialog;