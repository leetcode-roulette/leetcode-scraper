import EventEmitter from "eventemitter3";
import { PageEvents } from "./events";
import { eventPageResponse } from "./PageEventListeners";
import { Browser, Page } from "puppeteer";
import { bindPageEventListeners } from "./EventListeners";

export class LeetcodeEvents extends EventEmitter {
	constructor(private browser: Browser, public page: Page) {
		super();
		this.addPageEvents();
		this.addPageEventListeners(page);
	}

	protected addPageEventListeners(page: Page): void {
		bindPageEventListeners(page, this);
	}

	private addPageEvents() {
		this.on(PageEvents.PAGE_RESPONSE, eventPageResponse);
	}
}
