import { Browser, Page, PageEventObject } from "puppeteer";
import { BrowserEvents, PageEventsMap } from "./events";
import EventEmitter from "eventemitter3";

export function bindPageEventListeners(page: Page, context: EventEmitter) {
	const pageEvents: (keyof PageEventObject)[] = Array.from(PageEventsMap.values());
	pageEvents.map((event) => {
		page.on(event, (pageEvent) => {
			const eventName = `page_${event}`;
			context.emit(eventName, pageEvent, page);
		});
	});
}

export function bindBrowserEventListeners(browser: Browser, context: EventEmitter) {
	const browserEvents: (string | symbol)[] = Array.from(BrowserEvents.values());
}
