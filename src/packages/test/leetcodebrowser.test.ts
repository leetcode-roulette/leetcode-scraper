import LeetcodeBrowser from "../LeetCodeBrowser/LeetcodeBrowser";
import { config } from "dotenv";
config();

test("LeetcodeBrowser login()", async () => {
	let LeetcodeBrowser: LeetcodeBrowser = await LeetcodeBrowser.createInstance();
	await LeetcodeBrowser.login();
	expect(LeetcodeBrowser.getCookies).not.toEqual([]);
}, 30000);
