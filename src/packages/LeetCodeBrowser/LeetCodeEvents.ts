import EventEmitter from "eventemitter3";
import { HTTPResponse, Page } from "puppeteer";
import { PageEvents } from "./events";
import { LeetCodeRequestPaylod } from "./interfaces/LeetCodeXHRRequest";
import { LeetCodeResponsePayload } from "./interfaces/LeetCodeXHRResponse";
import { ProblemDataDB } from "../../db/ProblemDataDB";
import { LeetCodeQuestionData } from "./interfaces/LeetCodeQuestionData";

export class LeetCodeEvents extends EventEmitter {
	constructor() {
		super();
		this.initialize();
	}

	private async handleXHR(reqObject: LeetCodeRequestPaylod, resObject: LeetCodeResponsePayload) {
		const { operationName } = reqObject;
		console.log(operationName);
		switch (operationName) {
			case "questionData":
				let x: LeetCodeQuestionData = resObject.data.question;
				ProblemDataDB.insert(x);
			default:
			//console.log(operationName);
		}
	}

	private initialize() {
		this.on(PageEvents.PAGE_RESPONSE, async (res: HTTPResponse, page: Page) => {
			const request = await res.request();
			const resourceType = await request.resourceType();

			console.log(resourceType);
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
