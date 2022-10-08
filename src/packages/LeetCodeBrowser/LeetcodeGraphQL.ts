import { HTTPResponse, Page } from "puppeteer";
import { LeetcodeRequestPayload } from "./interfaces/LeetcodeGraphQLRequest";
import { LeetcodeResponsePayload } from "./interfaces/LeetcodeGraphlQLResponse";

class LeetcodeGraphQL {
	private static requests: Map<string, LeetcodeRequestPayload> = new Map<string, LeetcodeRequestPayload>();
	private static responses: Map<string, LeetcodeResponsePayload> = new Map<string, LeetcodeResponsePayload>();

	public static addRequest(operationName: string, data: LeetcodeRequestPayload) {
		this.requests.set(operationName, data);
	}

	public static addResponse(operationName: string, data: LeetcodeResponsePayload) {
		this.responses.set(operationName, data);
	}

	public static getRequests(): Map<string, LeetcodeRequestPayload> {
		return this.requests;
	}

	public static getResponses(): Map<string, LeetcodeResponsePayload> {
		return this.responses;
	}
}

export default LeetcodeGraphQL;

export async function handleLeetcodeGraphQLResponse(res: HTTPResponse, page: Page) {
	try {
		const req = res.request();
		const requestPostData = req.postData();
		if (requestPostData) {
			const requestPayload: LeetcodeRequestPayload = JSON.parse(requestPostData);
			if (requestPayload.operationName === "questionData") {
				const questionData: LeetcodeResponsePayload = await res.json();
				await parseQuestionData(questionData);
			}
		}
	} catch (error) {
		console.error("Error handling Leetcode GraphQL response.");
	}
}

async function parseQuestionData(questionData: LeetcodeResponsePayload) {
	console.log(questionData.data.question.title);
}
