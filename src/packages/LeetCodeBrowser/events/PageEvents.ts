import { PageEventObject, PageEmittedEvents } from "puppeteer";

const PageEvents = new Map<string, keyof PageEventObject>([
	["close", PageEmittedEvents.Close],
	["console", PageEmittedEvents.Console],
	["dialog", PageEmittedEvents.Dialog],
	["error", PageEmittedEvents.Error],
	["frameattached", PageEmittedEvents.FrameAttached],
	["framedetached", PageEmittedEvents.FrameDetached],
	["framenavigated", PageEmittedEvents.FrameNavigated],
	["load", PageEmittedEvents.Load],
	["metrics", PageEmittedEvents.Metrics],
	["pageerror", PageEmittedEvents.PageError],
	["popup", PageEmittedEvents.Popup],
	["request", PageEmittedEvents.Request],
	["requestfailed", PageEmittedEvents.RequestFailed],
	["requestfinished", PageEmittedEvents.RequestFinished],
	["requestservedfromcache", PageEmittedEvents.RequestServedFromCache],
	["response", PageEmittedEvents.Response],
	["workercreated", PageEmittedEvents.WorkerCreated],
	["workerdestroyed", PageEmittedEvents.WorkerDestroyed],
	["domcontentloaded", PageEmittedEvents.DOMContentLoaded],
]);

export default PageEvents;
