import mongoose, { Document, Model, Schema } from "mongoose";

interface iStats {
	accepted: number;
	submissions: number;
	acRate: string;
}
const StatsSchema: Schema<iStats> = new Schema({ accepted: "number", submissions: "number", acRate: "string" });

interface iTags {
	name: string;
	slug: string;
}

const TagsSchema: Schema<iTags> = new Schema({
	name: "string",
	slug: "string",
});

interface iSolution {
	solutionID: number;
	canSeeDetail: boolean;
	paidOnly: boolean;
	hasVideo: boolean;
}

const SolutionSchema: Schema<iSolution> = new Schema({
	solutionID: "number",
	canSeeDetail: "boolean",
	paidOnly: "boolean",
	hasVideo: "boolean",
});

export interface IProblemData extends Document {
	problemID: number;
	problemFrontendID: number;
	title: string;
	titleSlug: string;
	content: string;
	isPremium: boolean;
	difficulty: number;
	likes: number;
	dislikes: number;
	similarQuestions: string[];
	tags: iTags[];
	stats: iStats;
	hints: string[];
	solution: iSolution | null;
}

const ProblemDataSchema: Schema<IProblemData> = new mongoose.Schema({
	problemID: "number",
	problemFrontendID: "number",
	title: "string",
	titleSlug: "string",
	content: "string",
	isPremium: "boolean",
	difficulty: "number",
	likes: "number",
	dislikes: "number",
	similarQuestions: [String],
	tags: [TagsSchema],
	stats: StatsSchema,
	hints: [String],
	solution: { type: SolutionSchema, default: null },
});

const ProblemData: Model<IProblemData> = mongoose.model("problemData", ProblemDataSchema);
export default ProblemData;
