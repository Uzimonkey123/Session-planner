import { Fragment } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { ManagementDialogProps } from "../types";

function ManagementCode(props: ManagementDialogProps) {
    return (
        <Dialog open={props.open} onClose={() => props.setOpen(false)} as={Fragment}>
            <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <Typography variant="h6" className="text-gray-700">
                        Enter Management Code
                    </Typography>

                    <Input
                        type="text"
                        label="Management code"
                        value={props.code}
                        onChange={(e: { target: { value: string; }; }) => props.setCode(e.target.value)}
                        size="lg"
                        className="w-full"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <Button color="red" variant="text" onClick={() => props.setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="green" onClick={props.onVerify}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default ManagementCode