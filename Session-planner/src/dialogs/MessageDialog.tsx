import { Fragment } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Dialog } from "@headlessui/react";
import type { MessageDialogProps } from "../types";

function MessageDialog(props: MessageDialogProps) {
    return (
        <Dialog open={props.showMessageDialog} onClose={() => props.setShowMessageDialog(false)} as={Fragment}>
            <div className="fixed inset-0 flex items-center justify-center z-50 ml-48">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <Typography variant="h6" className="text-gray-700 mb-4">
                        {props.message}
                    </Typography>

                    <div className="flex justify-end">
                        <Button color="blue" onClick={() => props.setShowMessageDialog(false)}>
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )

}

export default MessageDialog