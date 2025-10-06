export interface Attendance {
    name: string;
    code: string;
};

export interface SessionListProps {
    id: number;
    title: string;
    description: string;
    date: string;
    maxParticipants: number;
    attendance: Attendance[];
}

export interface SessionDetailProps {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    maxParticipants: number;
    type: string;
    attendance: Attendance[];
}

export interface ManagementDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    code: string;
    setCode: (code: string) => void;
    onVerify: () => void;
}

export interface AttendanceDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    attendee: Attendance[];
}

export interface AttendanceActionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sessionId: string;
    onRefresh: () => void;
    canJoin?: boolean;
}
