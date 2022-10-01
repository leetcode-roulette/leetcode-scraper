import * as puppeteer from "puppeteer";
import { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import { bindBrowserEventListeners, bindPageEventListeners } from "./EventListeners";
import { LeetCodeEvents } from "./LeetCodeEvents";

export async function createLeetCodeBrowser(options?: PuppeteerLaunchOptions): Promise<LeetCodeBrowser> {
	options = options || {};
	let browser: Browser;
	let page: Page;
	try {
		browser = await puppeteer.launch(options);
		page = await browser.newPage();
	} catch (error) {
		console.error(error);
		return Promise.reject(`An error occured creating the SinglePageBrowser instance: ${error}`);
	}
	return Promise.resolve(new LeetCodeBrowser(options, browser, page));
}

export class LeetCodeBrowser extends LeetCodeEvents {
	private baseURL: string = "https://leetcode.com/problems";
	public constructor(private options: PuppeteerLaunchOptions, private browser: Browser, private page: Page) {
		super();
		this.addBrowserEventListeners(browser);
		this.addPageEventListeners(page);
	}

	private addPageEventListeners(page: Page): void {
		bindPageEventListeners(page, this);
	}

	private addBrowserEventListeners(browser: Browser): void {
		bindBrowserEventListeners(browser, this);
	}

	public async goTo(path: String) {
		const urlPath = `${this.baseURL}/${path}`;
		try {
			await this.page.goto(urlPath, { waitUntil: "networkidle0" });
		} catch (error) {
			this.log(error);
		}
	}

	private log(message: any) {
		console.error(`Class ${this.constructor.name}| An error has occured: ${message}`);
	}
}
