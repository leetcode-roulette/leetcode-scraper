import EventEmitter from "eventemitter3";
export class LeetCodeEvents extends EventEmitter {
	constructor() {
		super();
		this.initialize();
	}

	private initialize() {
		this.on("page_response", (pageEvent) => {
			console.log(pageEvent);
		});
	}
}
