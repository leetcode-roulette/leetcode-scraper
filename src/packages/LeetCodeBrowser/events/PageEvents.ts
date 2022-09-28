import { PageEventObject, PageEmittedEvents } from "puppeteer";

const PageEvents = new Map<string, keyof PageEventObject>([
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

export default PageEvents;
