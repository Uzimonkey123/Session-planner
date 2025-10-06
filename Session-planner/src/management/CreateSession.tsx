import { Button } from "@material-tailwind/react";
import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

function CreateSession() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		time: "",
		maxParticipants: 1,
		type: "public",
		email: ""
	}); // Basic form setup at the beginning
	const [responseMessage, setResponseMessage] = useState("");

	const handleChange = (e: { target: { name: any; value: any; }; }) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch("/sessions/create", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			// Set the response message from backend or error
			if (res.ok) {
				setResponseMessage(data.message);
			} else {
				setResponseMessage(data.error || "Failed to create session");
			}

		} catch (err) {
			setResponseMessage("Network error");
		}
	};

return (
	<div className="flex justify-center p-4">
		<Card className="w-full max-w-md">
			<CardBody>
				<Typography variant="h4" className="mb-6 text-center">
					Create Session
				</Typography>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Input
						label="Title"
						name="title"
						value={formData.title}
						onChange={handleChange}
					/>

					<Input
						label="Description"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>

					<Input
						type="date"
						label="Date"
						name="date"
						value={formData.date}
						onChange={handleChange}
					/>

					<Input
						type="time"
						label="Time"
						name="time"
						value={formData.time}
						onChange={handleChange}
					/>

					<Input
						type="number"
						label="Max Participants"
						name="maxParticipants"
						value={formData.maxParticipants}
						onChange={handleChange}
						min={1}
					/>

					<Input
						type="email"
						label="Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>

					<select className="bg-white rounded-md border-2 border-gray-400 p-2" 
							name="type" value={formData.type} onChange={handleChange}>
						<option value="public">Public</option>
						<option value="private">Private</option>
					</select>
					
					<Button type="submit">Create Session</Button>

					{responseMessage && <Typography className="text-center">{responseMessage}</Typography>}
				</form>
			</CardBody>
		</Card>
	</div>
);
}

export default CreateSession;