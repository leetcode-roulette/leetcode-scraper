import * as puppeteer from "puppeteer";
import { HTTPResponse } from "puppeteer";

export async function start() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const graphqlResponses: Object[] = [];

	page.on("response", async (res: HTTPResponse) => {
		const request = await res.request();
		const resourceType = await request.resourceType();

		if (resourceType == "xhr") {
			let responseData;

			try {
				const requestString = await request.postData();
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
	});
	await page.goto("https://leetcode.com/problems/two-sum", {
		timeout: 0,
	});
	//console.log(graphqlResponses);
	// await browser.close();
}
