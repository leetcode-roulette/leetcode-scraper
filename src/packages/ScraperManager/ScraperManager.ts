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

		const responses = LeetcodeBrowser.responses;

		const questionData = responses.get("questionData");
		if (questionData) {
			await this.insert(questionData.data.question);
		}
	}

	private async insert(questionData: LeetcodeQuestionData) {
		await ProblemDataDB.insert(questionData);
	}
	public async start() {
		let titleSlugs = await this.getTitleSlugs();
		for (let i = 0; i < titleSlugs.length; i++) {
			await this.scrape(titleSlugs[i]);
			console.log(`Scraped: ${titleSlugs[i]} |\t\t${i} of ${titleSlugs.length}`);
		}
	}
}

export default ScraperManager;
