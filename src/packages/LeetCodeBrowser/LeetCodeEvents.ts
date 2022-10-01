import EventEmitter from "eventemitter3";
import { PageEvents } from "./events";
import { LeetCodeRequestPaylod } from "./interfaces/LeetCodeXHRRequest";
import { LeetCodeResponsePayload } from "./interfaces/LeetCodeXHRResponse";
import { ProblemDataDB } from "../../db/ProblemDataDB";
import { LeetCodeQuestionData } from "./interfaces/LeetCodeQuestionData";

import { eventPageResponse } from "./PageEventListeners";

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

	private addPageEvents() {
		this.on(PageEvents.PAGE_RESPONSE, eventPageResponse);
	}
}
