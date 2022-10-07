import { config } from "dotenv";
import express, { Application } from "express";
import { Database } from "./db/db.config";
import LeetCodeBrowser from "./packages/LeetCodeBrowser/LeetCodeBrowser";
import healthcheck from "./routes/healthCheck";
config();

const serve = async (): Promise<void> => {
	const app: Application = express();
	await Database.connect();

	const lc = await LeetCodeBrowser.createInstance();

	const PORT = process.env.PORT || 3000;

	app.use("/", healthcheck);

	app.use(express.json());
	app.listen(PORT, () => {
		console.log(`Server is listening on port: ${PORT}`);
	});
};
serve();
