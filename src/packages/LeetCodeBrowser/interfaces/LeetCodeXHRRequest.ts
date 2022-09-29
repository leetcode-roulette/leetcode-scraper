export type LCGraphQLOperation =
	| "globalData"
	| "Submissions"
	| "Submissions"
	| "filterableCategories"
	| "allFavorites"
	| "questionData"
	| "debuggerLanguageFeatures"
	| "questionTags"
	| "allQuestionsRaw"
	| "interviewOptions"
	| "questionTopicCount"
	| "getBetaParticipation";

export interface LeetCodeRequestPaylod {
	operationName: LCGraphQLOperation;
	query: string;
	variables: Object;
}
export type LeetCodeXHRRequest = {
	[key in LCGraphQLOperation]: LeetCodeRequestPaylod;
};
