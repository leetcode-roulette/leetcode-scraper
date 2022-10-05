import EventEmitter from "eventemitter3";
import { PageEvents } from "./events";
import { ProblemDataDB } from "../../db/ProblemDataDB";
import { LeetCodeRequestPaylod } from "./interfaces/LeetCodeXHRRequest";
import { LeetCodeResponsePayload } from "./interfaces/LeetCodeXHRResponse";
import { LeetCodeQuestionData } from "./interfaces/LeetCodeQuestionData";

import { eventPageResponse } from "./PageEventListeners";
import { Browser, Page } from "puppeteer";
import { bindBrowserEventListeners, bindPageEventListeners } from "./EventListeners";

export class LeetCodeEvents extends EventEmitter {
	constructor() {
		super();
		this.addPageEvents();
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

	protected addPageEventListeners(page: Page): void {
		bindPageEventListeners(page, this);
	}

	protected addBrowserEventListeners(browser: Browser): void {
		bindBrowserEventListeners(browser, this);
	}

	private addPageEvents() {
		this.on(PageEvents.PAGE_RESPONSE, eventPageResponse);
	}
}
