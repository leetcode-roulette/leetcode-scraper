import puppeteer from "puppeteer-extra";
import { Browser, HTTPResponse, Page, Protocol, PuppeteerLaunchOptions } from "puppeteer";
import { LeetCodeEvents } from "./LeetCodeEvents";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import UserAgent from "../../../config/useragent";
import { openCookiesFromFile, saveCookiesToFile } from "../../utils/cookies";
class LeetCodeBrowser extends LeetCodeEvents {
	private static defaultOptions: PuppeteerLaunchOptions = {};
	private static baseURL: string = "https://leetcode.com/";
	private static loginURL: string = "https://leetcode.com/accounts/login";
	private static useragent: string = UserAgent.useragent;
	private cookies: Protocol.Network.Cookie[] = openCookiesFromFile() || [];

	private constructor(private options: PuppeteerLaunchOptions, private browser: Browser, private page: Page) {
		super();
	}

	public async goTo(path: String): Promise<void> {
		const urlPath = `${LeetCodeBrowser.baseURL}problems/${path}`;
		try {
			await this.page.goto(urlPath, { waitUntil: "networkidle0" });
		} catch (error) {
			this.log(error);
		}
	}
	public async login(): Promise<LeetCodeBrowser> {
		const loginBrowser = await puppeteer.launch({ headless: false });
		const defaultPages = await loginBrowser.pages();
		const loginPage = defaultPages[0];
		await loginPage.setUserAgent(LeetCodeBrowser.useragent);
		await loginPage.setCookie(...this.cookies);

		return new Promise(async (resolve, reject) => {
			try {
				const username = process.env.LEETCODE_USERNAME || "";
				const password = process.env.LEETCODE_PASSWORD || "";
				console.log("Use Browser to login to leetcode...");

				const loginInputID = "#id_login";
				const passwordInputID = "#id_password";

				await loginPage.goto(LeetCodeBrowser.loginURL, { waitUntil: "networkidle2" });
				if (loginPage.url() === LeetCodeBrowser.baseURL) {
					resolve(this);
				}
				await loginPage.type(loginInputID, username);
				await loginPage.type(passwordInputID, password);
				await loginPage.waitForFrame(LeetCodeBrowser.baseURL, { timeout: 0 });
				this.cookies = await loginPage.cookies();
				saveCookiesToFile(this.cookies);
				await loginBrowser.close();
				resolve(this);
			} catch (error) {
				await loginBrowser.close();
				reject(error);
			}
		});
	}

	protected async addEventListeners(): Promise<void> {
		this.addBrowserEventListeners(this.browser);
		this.addPageEventListeners(this.page);
	}

	public get getCookies(): Protocol.Network.Cookie[] {
		return this.cookies;
	}

	protected async initialize(): Promise<void> {
		try {
			await this.addEventListeners();
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
				const newLeetCodeBrowser: LeetCodeBrowser = new LeetCodeBrowser(options, browser, page);
				//await newLeetCodeBrowser.initialize();
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
