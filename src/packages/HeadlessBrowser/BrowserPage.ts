import { Page } from "puppeteer";
import { v4 as uuidv4 } from "uuid";
export class BrowserPage extends Page {
	private _pageKey: string;

	public constructor(pageKey?: string) {
		super();
		if (!pageKey) {
			pageKey = uuidv4();
		}
		this._pageKey = pageKey;
	}

	public get pageKey(): string {
		return this._pageKey as string;
	}
}
