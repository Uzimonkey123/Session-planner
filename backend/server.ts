import express from "express";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/sessions", router);

app.listen(PORT, () => {
	console.log(`Server start: http://localhost:${PORT}`);
});