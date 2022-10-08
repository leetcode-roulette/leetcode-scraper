import { IProblemData, ProblemData } from "../models/problemdata";
import { iStats, LeetcodeQuestionData, QuestionDifficulty } from "../packages/LeetCodeBrowser/interfaces/LeetcodeQuestionData";

export class ProblemDataDB {
	public static async insert(questionData: LeetcodeQuestionData): Promise<void> {
		let stats: iStats = JSON.parse(questionData.stats);
		let data: IProblemData = await ProblemData.create({
			problemID: questionData.questionId,
			problemFrontendID: questionData.questionFrontendId,
			title: questionData.title,
			titleSlug: questionData.titleSlug,
			content: questionData.content,
			isPremium: questionData.isPaidOnly,
			difficulty: QuestionDifficulty[questionData.difficulty],
			likes: questionData.likes,
			dislikes: questionData.dislikes,
			similarQuestions: questionData.similarQuestions,
			tags: questionData.topicTags,
			stats: { accepted: stats.totalAcceptedRaw, submissions: stats.totalSubmissionRaw, acRate: stats.acRate },
			hints: questionData.hints,
			solution: questionData.solution,
		});

		await data.save();
	}
}
