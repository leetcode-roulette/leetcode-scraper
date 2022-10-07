import mongoose from "mongoose";

export class Database {
	private static url: string | undefined;

	public static connect(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			mongoose.connect(this.connectionString);

			mongoose.connection.once("open", async (): Promise<void> => {
				console.log("Connected to database");
				resolve(true);
			});

			mongoose.connection.on("error", async (e): Promise<void> => {
				console.log("Error connectiong to database", e);
				resolve(false);
			});
		});
	}

	public static disconnect(): void {
		if (!mongoose.connection) {
			return;
		}

		mongoose.disconnect();

		mongoose.connection.close(async (): Promise<void> => {
			console.log("Disconnected from database");
		});
	}

	private static get connectionString(): string {
		this.url = process.env.MONGO_CONNECTION_STRING;

		if (this.url === undefined) {
			throw "MONGO_CONNECTION_STRING can not be found or is not defined";
		}

		return this.url;
	}
}
