import { Protocol } from "puppeteer";
import fs from "fs";
export function saveCookiesToFile(cookies: Protocol.Network.Cookie[]) {
	const extractedCookies = extractLeetCodeSession(cookies);
	const data = JSON.stringify(extractedCookies);
	fs.writeFile("user_cookies.json", data, (error) => {
		if (error) throw new Error(error.message);
	});
}

export function openCookiesFromFile(): Protocol.Network.Cookie[] | undefined {
	let data: Protocol.Network.Cookie[] = [];
	try {
		const json = fs.readFileSync("user_cookies.json");
		data = JSON.parse(json.toString());
	} catch (error) {
		console.error("user_cookies.json does not exists", error);
		return;
	}
	return data;
}

export function extractLeetCodeSession(cookies: Protocol.Network.Cookie[]) {
	const savedCookies: Protocol.Network.Cookie[] = [];
	for (var i = 0; i < cookies.length; i++) {
		if (cookies[i].name === "LEETCODE_SESSION" || cookies[i].name === "csrftoken") {
			savedCookies.push(cookies[i]);
		}
	}
	return cookies;
}
