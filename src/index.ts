import { config } from "dotenv";
import express, { Application } from "express";
import { Database } from "./db/db.config";
import ScraperManager from "./packages/ScraperManager/ScraperManager";
import healthcheck from "./routes/healthCheck";
config();

const serve = async (): Promise<void> => {
	const app: Application = express();
	Database.connect();
	await ScraperManager.initialize();

	const PORT = process.env.PORT || 3000;

	app.use("/", healthcheck);

	app.use(express.json());
	app.listen(PORT, () => {
		console.log(`Server is listening on port: ${PORT}`);
	});
};
serve();
