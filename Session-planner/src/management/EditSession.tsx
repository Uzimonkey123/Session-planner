import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";

function EditSession() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");
        const url = `http://localhost:3000/sessions/${id}${code ? `?code=${code}` : ""}`;
            
        fetch(url)
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((err) => console.error("Failed to fetch sessions:", err));
    }, [searchParams]);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setSession((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:3000/sessions/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(session),
            });
            if (!res.ok) throw new Error("Failed to update session");

            const data = await res.json();

            alert(data.message); // Pop-up with backend message
            navigate(`/`); // Back to main page
            
        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    if (errorMsg) return <div>Error: {errorMsg}</div>;


    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <Typography variant="h1" className="text-xl font-bold mb-4 text-black">
                Edit Session
            </Typography>

            <div className="flex flex-col gap-4">
            <Input 
                label="Title" 
                name="title" 
                value={session.title} 
                onChange={handleChange} 
            />

            <Input 
                label="Description" 
                name="description" 
                value={session.description} 
                onChange={handleChange} 
            />

            <Input 
                label="Date" 
                name="date" 
                value={session.date} 
                onChange={handleChange} 
            />

            <Input 
                label="Time" 
                name="time" 
                value={session.time} 
                onChange={handleChange} 
            />

            <Input 
                label="Max Participants" 
                name="maxParticipants" 
                type="number" 
                alue={session.maxParticipants} 
                onChange={handleChange} 
            />
            </div>

            <div className="flex gap-2 mt-4">
                <Button color="red" onClick={() => navigate(-1)}>Cancel</Button>
                <Button color="green" onClick={handleSubmit}>Save</Button>
            </div>
        </div>
    );
}

export default EditSession;