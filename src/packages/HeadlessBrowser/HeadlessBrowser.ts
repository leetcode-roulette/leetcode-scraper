import * as puppeteer from "puppeteer";
import { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";

interface IPageDictionary {
	[key: string]: BrowserPage;
}

class BrowserPage extends Page {
	private _pageKey: string | undefined = undefined;
	private _page: Page | undefined = undefined;

	public constructor(pageKey: string, page: Page) {
		super();
		this._pageKey = pageKey;
		this._page = page;
	}

	public get pageKey(): string {
		return this._pageKey as string;
	}

	public get page(): Page {
		return this._page as Page;
	}
}

export class HeadlessBrowser {
	private _browser: Browser | undefined = undefined;
	private _pages: IPageDictionary = {};

	public constructor(options?: PuppeteerLaunchOptions) {
		this.createPuppeteerInstance(options);
	}

	private async createPuppeteerInstance(options?: PuppeteerLaunchOptions) {
		this._browser = await puppeteer.launch(options);
	}

	public createNewPage(pageKey: string): BrowserPage {
		let browserPage: BrowserPage | any;
		try {
			(async () => {
				const newPage = await this._browser?.newPage();
				if (newPage instanceof Page) {
					browserPage = new BrowserPage(pageKey, newPage as Page);
				} else {
					throw new Error("The 'Browser' could not create a new Page!");
				}
			})();
			if (browserPage instanceof BrowserPage) {
				this._pages[pageKey] = browserPage;
				return browserPage;
			}
			throw new Error("Page could not be created.");
		} catch (e) {
			console.error(e);
		}
		return browserPage;
	}

	public pageGoTo(pageKey: string, url: string): BrowserPage {
		const page: BrowserPage = this._pages[pageKey];
		try {
			if (page instanceof BrowserPage) {
				(async () => {
					await page.goto(url);
				})();
			}
		} catch (e) {}

		return this._pages[pageKey];
	}

	public async deletePagByKey(pageKey: string) {
		const page: BrowserPage = this._pages[pageKey];
		try {
			if (page instanceof BrowserPage) {
				delete this._pages[pageKey];
				return;
			}
			throw new Error(`BrowserPage ${pageKey} does not exist.`);
		} catch (e) {
			console.error(e);
		}
	}
	public async deletePage(page: BrowserPage) {}

	public close() {
		async () => await this._browser?.close();
	}
}
