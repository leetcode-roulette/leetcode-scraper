import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page, Protocol, PuppeteerLaunchOptions } from "puppeteer";
import { LeetcodeEvents } from "./LeetcodeEvents";
import UserAgent from "../../../config/useragent";
import LeetcodeLogin from "./LeetcodeLogin";

puppeteer.use(StealthPlugin());

class LeetcodeBrowser extends LeetcodeEvents {
	private static defaultOptions: PuppeteerLaunchOptions = {};
	private static baseURL: string = "https://leetcode.com/";
	private sessionCookies: Protocol.Network.Cookie[] | undefined = undefined;

	private constructor(private options: PuppeteerLaunchOptions, browser: Browser, page: Page) {
		super(browser, page);
	}

	public async goTo(titleSlug: string): Promise<void> {
		const urlPath = this.createLeetcodeURL(titleSlug);
		try {
			await this.page.goto(urlPath, { waitUntil: "networkidle0" });
		} catch (error) {
			this.log(error);
		}
	}

	private createLeetcodeURL(titleSlug: string) {
		return `${LeetcodeBrowser.baseURL}problems/${titleSlug}`;
	}

	protected async initialize(): Promise<void> {
		this.sessionCookies = await LeetcodeLogin.getSessionCookies();
		this.page.setCookie(...this.sessionCookies);
	}

	public static async createInstance(options?: PuppeteerLaunchOptions): Promise<LeetcodeBrowser> {
		return new Promise(async (resolve, reject) => {
			try {
				options = options || this.defaultOptions;
				const browser = await puppeteer.launch(options);
				const page = await browser.newPage();
				await page.setUserAgent(UserAgent.useragent);
				const newLeetCodeBrowser: LeetcodeBrowser = new LeetcodeBrowser(options, browser, page);
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

export default LeetcodeBrowser;
