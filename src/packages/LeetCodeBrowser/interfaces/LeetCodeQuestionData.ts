export enum QuestionDifficulty {
	"Easy" = 1,
	"Medium" = 2,
	"Hard" = 3,
}

interface iTopicTags {
	name: string;
	slug: string;
	translatedName: string | null;
	__typename: string;
}

export interface iStats {
	totalAcceptedRaw: number;
	totalSubmissionRaw: number;
	acRate: string;
}

interface iSolution {
	id: number;
	canSeeDetail: boolean;
	paidOnly: boolean;
	hasVideoSolution: boolean;
	paidOnlyVideo: boolean;
}

export interface LeetcodeQuestionData {
	questionId: number;
	questionFrontendId: number;
	boundTopicId: string | null;
	title: string;
	titleSlug: string;
	content: string;
	translatedTitle: string | null;
	translatedContent: string | null;
	isPaidOnly: boolean;
	difficulty: keyof typeof QuestionDifficulty;
	likes: number;
	dislikes: number;
	similarQuestions: string;
	categoryTitle: string;
	contributers: string[];
	topicTags: iTopicTags[];
	stats: string;
	solution: iSolution | null;
	hints: string[] | null;
}
