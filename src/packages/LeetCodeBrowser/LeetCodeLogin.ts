import puppeteer from "puppeteer-extra";
import { Protocol } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import UserAgent from "../../../config/useragent";
import { openCookiesFromFile, saveCookiesToFile } from "../../utils/cookies";
puppeteer.use(StealthPlugin());

class LeetCodeLogin {
	private static loginURL: string = "https://leetcode.com/accounts/login";
	private static useragent: string = UserAgent.useragent;
	private static credentials: Protocol.Network.Cookie[];

	public static async loginInfo(): Promise<Protocol.Network.Cookie[]> {
		if (!LeetCodeLogin.credentials) {
			this.credentials = await LeetCodeLogin.getCredentials();
		}
		return this.credentials;
	}

	private static async getCredentials(): Promise<Protocol.Network.Cookie[]> {
		let credentials: Protocol.Network.Cookie[] | undefined = openCookiesFromFile();
		if (credentials) {
			return credentials;
		}
		credentials = await this.login();
		this.saveCredentials(credentials);
		return credentials;
	}

	private static saveCredentials(credentials: Protocol.Network.Cookie[]) {
		saveCookiesToFile(credentials);
	}

	private static async openLoginPage(): Promise<Protocol.Network.Cookie[]> {
		return new Promise(async (resolve, reject) => {
			const loginBrowser = await puppeteer.launch({ headless: false });
			const defaultPages = await loginBrowser.pages();
			const loginPage = defaultPages[0];
			await loginPage.setUserAgent(LeetCodeLogin.useragent);

			await loginPage.goto(LeetCodeLogin.loginURL, { waitUntil: "networkidle2" });

			loginPage.on("response", async (response) => {
				try {
					const request = response.request();
					if (request.resourceType() === "xhr") {
						const postData = request.postData() || "{}";
						const jsonPostData = JSON.parse(postData);
						if (jsonPostData.operationName === "globalData") {
							const response = request.response();
							const jsonResponse = await response?.json();
							if (jsonResponse.data.userStatus.isSignedIn) {
								resolve(loginPage.cookies());
							}
						}
					}
				} catch (error) {
					console.error(error);
				}
			});

			const username = process.env.LEETCODE_USERNAME || "";
			const password = process.env.LEETCODE_PASSWORD || "";
			console.log("Use provided browser to login to leetcode...");
			const loginInputID = "#id_login";
			const passwordInputID = "#id_password";

			await loginPage.type(loginInputID, username);
			await loginPage.type(passwordInputID, password);

			await loginPage.waitForSelector(`aria/User Profile`, { timeout: 0 });
			await loginBrowser.close();
		});
	}

	private static async login(): Promise<Protocol.Network.Cookie[]> {
		const credentials = await this.openLoginPage();
		console.log("logged in!", credentials);
		return credentials;
	}
}

export default LeetCodeLogin;
