import { config } from "dotenv";
import express, { Application } from "express";
import LeetCode from "./routes/Leetcode/leetcode";
config();
const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/leetcodeproblem", LeetCode);

app.listen(PORT, () => {
	console.log(`Server is listening on port: ${PORT}`);
});
