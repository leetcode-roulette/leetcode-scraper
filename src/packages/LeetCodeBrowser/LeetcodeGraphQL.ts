import { HTTPResponse, Page } from "puppeteer";
import { LeetcodeRequestPayload } from "./interfaces/LeetcodeGraphQLRequest";
import { LeetcodeResponsePayload } from "./interfaces/LeetcodeGraphlQLResponse";

class LeetcodeGraphQL {
	private static readonly graphQLURL: string = "https://leetcode.com/graphql";
	private static requests: Map<string, LeetcodeRequestPayload> = new Map<string, LeetcodeRequestPayload>();
	private static responses: Map<string, LeetcodeResponsePayload> = new Map<string, LeetcodeResponsePayload>();

	private static addRequest(operationName: string, data: LeetcodeRequestPayload) {
		this.requests.set(operationName, data);
	}

	private static addResponse(operationName: string, data: LeetcodeResponsePayload) {
		this.responses.set(operationName, data);
	}

	public static getRequests(): Map<string, LeetcodeRequestPayload> {
		return this.requests;
	}

	public static getResponses(): Map<string, LeetcodeResponsePayload> {
		return this.responses;
	}

	public static flush() {
		this.requests.clear();
		this.responses.clear();
	}

	public static async eventPageResponse(res: HTTPResponse, page: Page) {
		const resUrl = res.url();
		if (resUrl === LeetcodeGraphQL.graphQLURL) {
			await LeetcodeGraphQL.handleResponse(res, page);
		}
	}

	private static async handleResponse(res: HTTPResponse, page: Page) {
		try {
			const req = res.request();
			const requestPostData = req.postData();
			if (requestPostData) {
				const requestPayload: LeetcodeRequestPayload = JSON.parse(requestPostData);
				const responsePayload: LeetcodeResponsePayload = await res.json();
				LeetcodeGraphQL.addRequest(requestPayload.operationName, requestPayload);
				LeetcodeGraphQL.addResponse(requestPayload.operationName, responsePayload);
			}
		} catch (error) {
			console.error("Error handling Leetcode GraphQL response.");
		}
	}
}

export default LeetcodeGraphQL;
