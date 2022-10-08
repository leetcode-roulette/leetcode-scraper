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

export interface LeetcodeRequestPayload {
	operationName: LCGraphQLOperation;
	query: string;
	variables: Object;
}
export type LeetcodeXHRRequest = {
	[key in LCGraphQLOperation]: LeetcodeRequestPayload;
};
