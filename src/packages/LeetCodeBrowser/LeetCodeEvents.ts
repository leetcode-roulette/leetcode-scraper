import EventEmitter from "eventemitter3";
import { PageEvents } from "./events";
import { eventPageResponse } from "./PageEventListeners";
import { Browser, Page } from "puppeteer";
import { bindBrowserEventListeners, bindPageEventListeners } from "./EventListeners";

export class LeetCodeEvents extends EventEmitter {
	constructor(private browser: Browser, public page: Page) {
		super();
		this.addPageEvents();
		this.addPageEventListeners(page);
		this.addBrowserEventListeners(browser);
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
