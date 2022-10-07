import puppeteer from "puppeteer-extra";
import { HTTPResponse, Page, Protocol } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import UserAgent from "../../../config/useragent";
import { openCookiesFromFile, saveCookiesToFile } from "../../utils/cookies";
import { LeetcodeGlobalData } from "./interfaces/LeetcodeGlobalData";
puppeteer.use(StealthPlugin());

class LeetCodeLogin {
	private static baseURL: string = "https://leetcode.com/";
	private static loginURL: string = "https://leetcode.com/accounts/login";
	private static useragent: string = UserAgent.useragent;
	private static sessionCookies: Protocol.Network.Cookie[];

	public static async getSessionCookies(): Promise<Protocol.Network.Cookie[]> {
		if (!LeetCodeLogin.sessionCookies) {
			this.sessionCookies = await LeetCodeLogin.getCredentials();
		}
		return this.sessionCookies;
	}

	private static async getCredentials(): Promise<Protocol.Network.Cookie[]> {
		let sessionCookies: Protocol.Network.Cookie[] | undefined = openCookiesFromFile();
		const isLoggedIn = await this.checkLoginStatus(sessionCookies);
		if (sessionCookies && isLoggedIn) {
			return sessionCookies;
		}
		sessionCookies = await this.login();
		this.saveCredentials(sessionCookies);
		return sessionCookies;
	}

	private static saveCredentials(sessionCookies: Protocol.Network.Cookie[]) {
		saveCookiesToFile(sessionCookies);
	}

	private static async getLeetcodeGlobalData(page: Page): Promise<LeetcodeGlobalData> {
		return new Promise(async (resolve, reject) => {
			page.on("response", async (response) => {
				const request = response.request();
				if (request.resourceType() === "xhr") {
					const postData = request.postData();
					if (postData) {
						try {
							const jsonPostData = JSON.parse(postData);
							if (typeof jsonPostData === "object" && jsonPostData !== null) {
								if (jsonPostData.operationName === "globalData") {
									const responseObject = await response.json();
									resolve(responseObject.data);
								}
							}
						} catch (error) {}
					}
				}
			});
			page.goto(LeetCodeLogin.baseURL).catch((error) => {
				//console.error(error);
			});
		});
	}

	private static checkLoginStatus(sessionCookies: Protocol.Network.Cookie[] | undefined): Promise<Boolean> {
		return new Promise(async (resolve, reject) => {
			if (!sessionCookies) return resolve(false);
			const loginBrowser = await puppeteer.launch();
			const defaultPages = await loginBrowser.pages();
			const loginPage = defaultPages[0];
			await loginPage.setUserAgent(LeetCodeLogin.useragent);
			await loginPage.setCookie(...sessionCookies);

			const { userStatus } = await this.getLeetcodeGlobalData(loginPage);
			await loginBrowser.close();

			resolve(userStatus.isSignedIn);
		});
	}

	private static async waitForLogin(response: HTTPResponse, loginPage: Page): Promise<Protocol.Network.Cookie[]> {
		return new Promise(async (resolve, reject) => {
			try {
				const request = response.request();
				if (request.resourceType() === "xhr") {
					const postData = request.postData();
					if (postData) {
						const jsonPostData = JSON.parse(postData);
						if (typeof jsonPostData === "object" && jsonPostData !== null) {
							if (jsonPostData.operationName === "globalData") {
								const jsonResponse = await response.json();
								if (jsonResponse.data.userStatus.isSignedIn) {
									resolve(loginPage.cookies());
								}
							}
						}
					}
				}
			} catch (error) {
				console.error(error);
			}
		});
	}

	private static async openLoginPage(): Promise<Protocol.Network.Cookie[]> {
		return new Promise(async (resolve, reject) => {
			const loginBrowser = await puppeteer.launch({ headless: false });
			const defaultPages = await loginBrowser.pages();
			const loginPage = defaultPages[0];
			await loginPage.setUserAgent(LeetCodeLogin.useragent);

			await loginPage.goto(LeetCodeLogin.loginURL, { waitUntil: "networkidle2" });

			loginPage.on("response", async (response) => {
				const sessionCookies = await this.waitForLogin(response, loginPage);
				await loginBrowser.close();
				resolve(sessionCookies);
			});

			const username = process.env.LEETCODE_USERNAME || "";
			const password = process.env.LEETCODE_PASSWORD || "";
			console.log("Use provided browser to login to leetcode...");
			const loginInputID = "#id_login";
			const passwordInputID = "#id_password";

			await loginPage.type(loginInputID, username);
			await loginPage.type(passwordInputID, password);
		});
	}

	private static async login(): Promise<Protocol.Network.Cookie[]> {
		const sessionCookies = await this.openLoginPage();
		console.log("logged in!", sessionCookies);
		return sessionCookies;
	}
}

export default LeetCodeLogin;
