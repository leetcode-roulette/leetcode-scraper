import LeetCodeBrowser from "../LeetCodeBrowser/LeetCodeBrowser";
import { config } from "dotenv";
config();

test("LeetCodeBrowser login()", async () => {
	let leetCodeBrowser: LeetCodeBrowser = await LeetCodeBrowser.createInstance();
	await leetCodeBrowser.login();
	expect(leetCodeBrowser.getCookies).not.toEqual([]);
}, 30000);
