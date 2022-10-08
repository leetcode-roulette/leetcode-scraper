import { HTTPResponse, Page } from "puppeteer";
import { handleLeetcodeGraphQLResponse } from "./LeetcodeGraphQL";

export async function eventPageResponse(res: HTTPResponse, page: Page) {
	const resUrl = res.url();
	if (resUrl === "https://leetcode.com/graphql") {
		handleLeetcodeGraphQLResponse(res, page);
	}
}
