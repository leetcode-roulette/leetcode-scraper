import puppeteer from "puppeteer-extra";
import { Browser, Page, Protocol, PuppeteerLaunchOptions } from "puppeteer";
import { LeetCodeEvents } from "./LeetCodeEvents";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import UserAgent from "../../../config/useragent";
import LeetCodeLogin from "./LeetCodeLogin";
class LeetCodeBrowser extends LeetCodeEvents {
	private static defaultOptions: PuppeteerLaunchOptions = {};
	private static baseURL: string = "https://leetcode.com/";
	private credentials: Protocol.Network.Cookie[] | undefined = undefined;

	private constructor(private options: PuppeteerLaunchOptions, browser: Browser, page: Page) {
		super(browser, page);
	}

	public async goTo(path: String): Promise<void> {
		const urlPath = `${LeetCodeBrowser.baseURL}problems/${path}`;
		try {
			await this.page.goto(urlPath, { waitUntil: "networkidle0" });
		} catch (error) {
			this.log(error);
		}
	}

	protected async initialize(): Promise<void> {
		try {
			this.credentials = await LeetCodeLogin.loginInfo();
		} catch (error: any) {
			throw new Error(`Error occured during ${this.constructor.name} Initialization : ${error}`);
		}
	}

	public static async createInstance(options?: PuppeteerLaunchOptions): Promise<LeetCodeBrowser> {
		return new Promise(async (resolve, reject) => {
			try {
				options = options || this.defaultOptions;
				const browser = await puppeteer.launch(options);
				const page = await browser.newPage();
				await page.setUserAgent(UserAgent.useragent);
				const newLeetCodeBrowser: LeetCodeBrowser = new LeetCodeBrowser(options, browser, page);
				await newLeetCodeBrowser.initialize();
				resolve(newLeetCodeBrowser);
			} catch (error) {
				reject(`An error occured creating the SinglePageBrowser instance: ${error}`);
			}
		});
	}

	private log(message: any) {
		console.error(`Class ${this.constructor.name}| An error has occured: ${message}`);
	}
}

export default LeetCodeBrowser;
