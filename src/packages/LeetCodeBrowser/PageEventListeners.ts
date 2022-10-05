import { HTTPResponse, HTTPRequest, Page, ResourceType } from "puppeteer";
import { LeetCodeRequestPaylod } from "./interfaces/LeetCodeXHRRequest";
import { LeetCodeResponsePayload } from "./interfaces/LeetCodeXHRResponse";

export async function eventPageResponse(res: HTTPResponse, page: Page) {
	const req = await res.request();
	const resourceType = await req.resourceType();
	handlePageResponse(req, res, resourceType, page);
}

async function handlePageResponse(req: HTTPRequest, res: HTTPResponse, resourceType: ResourceType, page: Page) {
	switch (resourceType) {
		case "xhr":
			const data = await xhrResourceType(req, res);
			break;
		default:
		// unhandled resource type
	}
}

async function xhrResourceType(req: HTTPRequest, res: HTTPResponse) {
	let responseData: LeetCodeResponsePayload;
	try {
		const requestString = await req.postData();
		if (requestString) {
			const requestPayload: LeetCodeRequestPaylod = await JSON.parse(requestString);
			responseData = await res.json();
			console.log(responseData);
			//this.handleXHR(requestPayload, responseData);
		}
	} catch (error) {
		console.error(error);
	}
}
