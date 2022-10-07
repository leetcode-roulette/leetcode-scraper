import { EventEmitter } from "eventemitter3";
import { getTitleSlugs } from "../../db/Problem";
import LeetCodeBrowser from "../LeetCodeBrowser/LeetCodeBrowser";

class ScraperManager extends EventEmitter {
	private static leetcodeBrowser: LeetCodeBrowser | null = null;
	private static titleSlugs: string[] = [];

	private async getLeetcodeBrowser() {
		if (!ScraperManager.leetcodeBrowser) {
			ScraperManager.leetcodeBrowser = await LeetCodeBrowser.createInstance({ headless: false });
		}
		return ScraperManager.leetcodeBrowser;
	}

	private async getTitleSlugs() {
		if (!ScraperManager.titleSlugs) {
			ScraperManager.titleSlugs = await getTitleSlugs();
		}
		return ScraperManager.titleSlugs;
	}

	private async scrape(titleSlug: string) {
		const leetcodeBrowser = await this.getLeetcodeBrowser();
		leetcodeBrowser.goTo(titleSlug);
	}
	public async start() {
		const titleSlugs = await getTitleSlugs();
		console.log(titleSlugs);
		this.scrape(titleSlugs[59]);
	}
}

export default new ScraperManager();
