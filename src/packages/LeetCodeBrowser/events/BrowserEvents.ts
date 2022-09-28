import { BrowserEmittedEvents } from "puppeteer";

const BrowserEvents = new Map<string, string | symbol>([["disconnected", BrowserEmittedEvents.Disconnected]]);

export default BrowserEvents;
