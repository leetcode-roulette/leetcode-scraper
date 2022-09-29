import { HTTPRequest, HTTPResponse, ResourceType } from "puppeteer";

export async function PageResponse(
	res: HTTPResponse,
	resourceType: ResourceType,
	callback: (res: HTTPResponse, req: HTTPRequest, resourceType: ResourceType) => void
) {
	const req = await res.request();

	const graphqlResponses = await callback(res, req, resourceType);
	return graphqlResponses;
}

export async function xhrResourceType(res: HTTPResponse, req: HTTPRequest, resourceType: ResourceType) {
	let responseData;
	const graphqlResponses: Object[] = [];
	try {
		const requestString = await req.postData();
		if (!requestString) {
			throw new Error("Request String is undefined");
		}
		const requestPayload = await JSON.parse(requestString);
		console.log(requestPayload);

		responseData = await res.json();
	} catch (e) {
		console.error(e);
	}

	graphqlResponses.push(responseData);
}
