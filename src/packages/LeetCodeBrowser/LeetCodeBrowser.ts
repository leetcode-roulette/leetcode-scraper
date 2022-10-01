import * as puppeteer from "puppeteer";
import { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import { bindBrowserEventListeners, bindPageEventListeners } from "./EventListeners";
import { LeetCodeEvents } from "./LeetCodeEvents";

export class LeetCodeBrowser extends LeetCodeEvents {
	private baseURL: string = "https://leetcode.com/problems";
	private constructor(private options: PuppeteerLaunchOptions, private browser: Browser, private page: Page) {
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
			await this.page.goto(urlPath);
		} catch (error) {
			this.log(error);
		}
	}

	private async loginToLeetCode() {}

	protected async initialize() {
		await this.loginToLeetCode();
	}

	public static async createInstance(options?: PuppeteerLaunchOptions): Promise<LeetCodeBrowser> {
		try {
			options = options || {};
			const browser = await puppeteer.launch(options);
			const page = await browser.newPage();
			const newLeetCodeBrowser: LeetCodeBrowser = new LeetCodeBrowser(options, browser, page);
			await newLeetCodeBrowser.initialize();
			return new Promise(function (resolve, reject) {
				resolve(newLeetCodeBrowser);
			});
		} catch (error) {
			return new Promise(function (resolve, reject) {
				return reject(`An error occured creating the SinglePageBrowser instance: ${error}`);
			});
		}
	}

	private log(message: any) {
		console.error(`Class ${this.constructor.name}| An error has occured: ${message}`);
	}
}
