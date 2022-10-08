import EventEmitter from "eventemitter3";
import { Browser, Page } from "puppeteer";
import { bindPageEventListeners } from "./EventListeners";

export class LeetcodeEvents extends EventEmitter {
	constructor(private browser: Browser, public page: Page) {
		super();
		this.addPageEventListeners(page);
	}

	protected addPageEventListeners(page: Page): void {
		bindPageEventListeners(page, this);
	}
}
