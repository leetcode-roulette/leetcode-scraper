import { EventEmitter } from "eventemitter3";
import { getTitleSlugs } from "../../db/Problem";
import LeetcodeBrowser from "../LeetCodeBrowser/LeetcodeBrowser";
import { ProblemDataDB } from "../../db/ProblemDataDB";
import { LeetcodeQuestionData } from "../LeetCodeBrowser/interfaces/LeetcodeQuestionData";

class ScraperManager extends EventEmitter {
	private static LeetcodeBrowser: LeetcodeBrowser | null = null;
	private static titleSlugs: string[] | undefined = undefined;

	private async getLeetcodeBrowser() {
		if (!ScraperManager.LeetcodeBrowser) {
			ScraperManager.LeetcodeBrowser = await LeetcodeBrowser.createInstance();
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

		const responses = LeetcodeBrowser.responses;

		const questionData = responses.get("questionData");
		if (questionData) {
			await this.insert(questionData.data.question);
		}
	}

	private async insert(questionData: LeetcodeQuestionData) {
		await ProblemDataDB.insert(questionData);
	}

	/**
	 * // TODO: comment getScriptVersion
	 * Sets node timeout
	 * @param delay: ms
	 * @returns Promise<void>
	 */
	async timeout(delay: number): Promise<void> {
		return new Promise((res) => setTimeout(res, delay));
	}
	public async start(delay: number = 1000) {
		let titleSlugs = await this.getTitleSlugs();
		for (let i = 0; i < titleSlugs.length; i++) {
			await this.scrape(titleSlugs[i]);
			await this.timeout(delay);
			console.log(`Scraped: ${titleSlugs[i]} |\t\t${i} of ${titleSlugs.length}`);
		}
	}
}

export default ScraperManager;
