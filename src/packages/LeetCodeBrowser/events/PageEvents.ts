import { PageEventObject, PageEmittedEvents } from "puppeteer";

const PageEventsMap = new Map<string, keyof PageEventObject>([
	["page_close", PageEmittedEvents.Close],
	["page_console", PageEmittedEvents.Console],
	["page_dialog", PageEmittedEvents.Dialog],
	["page_error", PageEmittedEvents.Error],
	["page_frameattached", PageEmittedEvents.FrameAttached],
	["page_framedetached", PageEmittedEvents.FrameDetached],
	["page_framenavigated", PageEmittedEvents.FrameNavigated],
	["page_load", PageEmittedEvents.Load],
	["page_metrics", PageEmittedEvents.Metrics],
	["page_pageerror", PageEmittedEvents.PageError],
	["page_popup", PageEmittedEvents.Popup],
	["page_request", PageEmittedEvents.Request],
	["page_requestfailed", PageEmittedEvents.RequestFailed],
	["page_requestfinished", PageEmittedEvents.RequestFinished],
	["page_requestservedfromcache", PageEmittedEvents.RequestServedFromCache],
	["page_response", PageEmittedEvents.Response],
	["page_workercreated", PageEmittedEvents.WorkerCreated],
	["page_workerdestroyed", PageEmittedEvents.WorkerDestroyed],
	["page_domcontentloaded", PageEmittedEvents.DOMContentLoaded],
]);

enum PageEvents {
	PAGE_CLOSE = "page_close",
	PAGE_CONSOLE = "page_console",
	PAGE_DIALOG = "page_dialog",
	PAGE_ERROR = "page_error",
	PAGE_FRAME_ATTACHED = "page_frameattached",
	PAGE_FRAME_DETACHED = "page_framedetached",
	PAGE_FRAME_NAVIGATED = "page_framenavigated",
	PAGE_LOAD = "page_load",
	PAGE_METRICS = "page_metrics",
	PAGE_PAGE_ERROR = "page_pageerror",
	PAGE_POPUP = "page_popup",
	PAGE_REQUEST = "page_request",
	PAGE_REQUEST_FAILED = "page_requestfailed",
	PAGE_REQUEST_FINISHED = "page_requestfinished",
	PAGE_REQUEST_SERVED_FROM_CACHE = "page_requestservedfromcache",
	PAGE_RESPONSE = "page_response",
	PAGE_WORKER_CREATED = "page_workercreated",
	PAGE_WORKER_DESTROYED = "page_workerdestroyed",
	PAGE_DOM_CONTENT_LOADED = "page_domcontentloaded",
}

export { PageEvents, PageEventsMap };
