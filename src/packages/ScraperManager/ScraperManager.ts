import { EventEmitter } from "eventemitter3";
import { getTitleSlugs } from "../../db/Problem";
import LeetcodeBrowser from "../LeetCodeBrowser/LeetcodeBrowser";

class ScraperManager extends EventEmitter {
	private static LeetcodeBrowser: LeetcodeBrowser | null = null;
	private static titleSlugs: string[] = [];

	private async getLeetcodeBrowser() {
		if (!ScraperManager.LeetcodeBrowser) {
			ScraperManager.LeetcodeBrowser = await LeetcodeBrowser.createInstance({ headless: false });
		}
		return ScraperManager.LeetcodeBrowser;
	}

	private async getTitleSlugs() {
		if (!ScraperManager.titleSlugs) {
			ScraperManager.titleSlugs = await getTitleSlugs();
		}
		return ScraperManager.titleSlugs;
	}

	private async scrape(titleSlug: string) {
		const LeetcodeBrowser = await this.getLeetcodeBrowser();
		await LeetcodeBrowser.goTo(titleSlug);
	}
	public async start() {
		const titleSlugs = await getTitleSlugs();
		this.scrape(titleSlugs[Math.floor(Math.random() * titleSlugs.length - 1)]);
	}
}

export default ScraperManager;
