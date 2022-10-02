import puppeteer from "puppeteer-extra";
import { Browser, Page, PuppeteerLaunchOptions } from "puppeteer";
import { bindBrowserEventListeners, bindPageEventListeners } from "./EventListeners";
import { LeetCodeEvents } from "./LeetCodeEvents";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export class LeetCodeBrowser extends LeetCodeEvents {
	private static defaultOptions: PuppeteerLaunchOptions = {};
	private baseURL: string = "https://leetcode.com/";
	private loginURL: string = "https://leetcode.com/accounts/login";
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
		const urlPath = `${this.baseURL}problems/${path}`;
		try {
			await this.page.goto(urlPath, { waitUntil: "networkidle0" });
		} catch (error) {
			this.log(error);
		}
	}

	private async loginToLeetCode() {
		const username = process.env.LEETCODE_USERNAME;
		const password = process.env.LEETCODE_PASSWORD;
		console.log("Attempting to login to leetcode...");
		if (!username || !password) {
			throw new Error("LEETCODE_USERNAME or LEETCODE_PASSWORD can not be found or is not defined");
		}

		const loginInputID = "#id_login";
		const passwordInputID = "#id_password";
		const submitBtnID = "#signin_btn";

		const inputDelay = 100;

		await this.page.goto(this.loginURL, { waitUntil: "networkidle0" });
		await this.page.type(loginInputID, username, { delay: inputDelay });
		await this.page.type(passwordInputID, password, { delay: inputDelay });
		try {
			const [response] = await Promise.all([
				this.page.waitForNavigation(),
				this.page.click(submitBtnID, { delay: inputDelay }),
			]);
			if (response) {
				if (response.url() === this.baseURL) {
					console.log("Logged into leetcode!");
					return;
				}
			}
		} catch (error) {
			console.log(error);
		}
		throw new Error(`Could not login to Leetcode with provided username and password.`);
	}

	protected async initialize() {
		await this.loginToLeetCode();
	}
	public static async createInstance(options?: PuppeteerLaunchOptions): Promise<LeetCodeBrowser> {
		try {
			options = options || this.defaultOptions;
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
