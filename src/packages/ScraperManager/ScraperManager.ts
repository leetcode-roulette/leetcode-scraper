import { EventEmitter } from "eventemitter3";
import { getTitleSlugs } from "../../db/Problem";
import { createLeetCodeBrowser, LeetCodeBrowser } from "../LeetCodeBrowser/LeetCodeBrowser";

class ScraperManager extends EventEmitter {
	private browser: LeetCodeBrowser | null = null;
	private titleSlugs: string[] = [];

	private async getTitleSlugs() {
		this.titleSlugs = await getTitleSlugs();
	}

	private async populateAllProblemData() {
		await this.browser?.goTo(this.titleSlugs[21]);
	}

	private async createBrowserInstance() {
		this.browser = await createLeetCodeBrowser();
	}

	public async initialize() {
		await this.createBrowserInstance();
		await this.getTitleSlugs();
		this.populateAllProblemData();
	}
}

export default new ScraperManager();
