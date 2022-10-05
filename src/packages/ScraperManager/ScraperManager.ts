import { EventEmitter } from "eventemitter3";
import { getTitleSlugs } from "../../db/Problem";
import LeetCodeBrowser from "../LeetCodeBrowser/LeetCodeBrowser";

class ScraperManager extends EventEmitter {
	private browser: LeetCodeBrowser | null = null;
	private titleSlugs: string[] = [];

	private async getTitleSlugs() {
		this.titleSlugs = await getTitleSlugs();
	}

	private async populateAllProblemData() {
		await this.browser?.goTo(this.titleSlugs[0]);
	}

	private async createBrowserInstance() {
		this.browser = await LeetCodeBrowser.createInstance();
	}

	public async start() {
		await this.populateAllProblemData();
	}

	public async initialize() {
		await this.createBrowserInstance();
		await this.getTitleSlugs();
		this.populateAllProblemData();
	}
}

export default new ScraperManager();
