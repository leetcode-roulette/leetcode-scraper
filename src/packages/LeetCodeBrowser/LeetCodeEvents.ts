import EventEmitter from "eventemitter3";
import { HTTPResponse, Page } from "puppeteer";
import { PageEvents } from "./events";
import { LeetCodeRequestPaylod } from "./types/LeetCodeXHRRequest";
import { LeetCodeResponsePayload } from "./types/LeetCodeXHRResponse";

export class LeetCodeEvents extends EventEmitter {
	constructor() {
		super();
		this.initialize();
	}

	private async handleXHR(reqObject: LeetCodeRequestPaylod, resObject: LeetCodeResponsePayload) {
		const { operationName } = reqObject;
		switch (operationName) {
			case "questionData":
				console.log(resObject.data);
			default:
				console.log(operationName);
		}
	}

	private initialize() {
		this.on(PageEvents.PAGE_RESPONSE, async (res: HTTPResponse, page: Page) => {
			const request = await res.request();
			const resourceType = await request.resourceType();
			if (resourceType == "xhr") {
				let responseData: LeetCodeResponsePayload;

				try {
					const requestString = await request.postData();
					if (requestString) {
						const requestPayload: LeetCodeRequestPaylod = await JSON.parse(requestString);
						responseData = await res.json();
						this.handleXHR(requestPayload, responseData);
					}
				} catch (e) {
					console.error(e);
				}
			}
		});
	}
}
