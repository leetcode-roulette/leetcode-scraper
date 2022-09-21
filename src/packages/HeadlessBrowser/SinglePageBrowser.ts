import * as puppeteer from "puppeteer";
import { Page } from "puppeteer";
import { Browser, PuppeteerLaunchOptions } from "puppeteer";

export class SinglePageBrowser {
	private _browser!: Browser;
	private _page!: Page;

	public async createPuppeteerInstance(options?: PuppeteerLaunchOptions) {
		this._browser = await puppeteer.launch(options);
		this._page = await this._browser.newPage();
	}

	public get browser(): Browser {
		return this._browser;
	}

	public get page(): Page {
		return this._page;
	}

	public async close() {
		await this._browser?.close();
	}
}
