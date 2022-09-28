import { config } from "dotenv";
import express, { Application } from "express";
import { Database } from "./db/db.config";
import healthcheck from "./healthCheck";
import LeetCode from "./routes/Leetcode/leetcode";
config();

const serve = async (): Promise<void> => {
	const app: Application = express();
	await Database.connect();

	const PORT = process.env.PORT || 3000;

	app.use("/", healthcheck);

	app.use(express.json());
	app.use("/leetcodeproblem", LeetCode);

	app.listen(PORT, () => {
		console.log(`Server is listening on port: ${PORT}`);
	});
};
serve();
