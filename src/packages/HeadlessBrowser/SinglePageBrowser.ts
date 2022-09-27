import * as puppeteer from "puppeteer";
import { Browser, Page, PageEventObject, PuppeteerLaunchOptions, ResourceType } from "puppeteer";

export async function createSinglePageBrowser(options?: PuppeteerLaunchOptions): Promise<SinglePageBrowser> {
	if (options === undefined) {
		options = {};
	}
	let browser: Browser;
	let page: Page;
	try {
		browser = await puppeteer.launch(options);
		page = await browser.newPage();
	} catch (error) {
		console.error(error);
		return Promise.reject(`An error occured creating the SinglePageBrowser instance: ${error}`);
	}
	return Promise.resolve(new SinglePageBrowser(options, browser, page));
}

export class SinglePageBrowser {
	private _options: PuppeteerLaunchOptions;
	private _browser: Browser;
	private _page: Page;

	public constructor(options: PuppeteerLaunchOptions, browser: Browser, page: Page) {
		this._options = options;
		this._browser = browser;
		this._page = page;
	}

	public addPageListener<K extends keyof PageEventObject>(
		eventName: K,
		resourceType: ResourceType,
		handler: (event: PageEventObject[K]) => void
	) {
		console.log(eventName, resourceType, handler);
	}

	public get Page() {
		return this._page;
	}

	public get Browser() {
		return this._browser;
	}

	public async close(): Promise<void> {
		return Promise.resolve(await this._browser.close());
	}
}
