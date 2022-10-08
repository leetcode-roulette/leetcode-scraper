import { Page, PageEventObject } from "puppeteer";
import { PageEventsMap } from "./events";
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
