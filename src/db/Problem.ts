import { connection } from "mongoose";

export async function getTitleSlugs(): Promise<string[]> {
	let problems = await getProblemsCollection();
	const titleSlug: string[] = [];
	for await (const doc of problems.find({ titleSlug: { $ne: null } })) {
		titleSlug.push(doc.titleSlug);
	}
	return Promise.resolve(titleSlug);
}

async function getProblemsCollection(): Promise<any> {
	let problems = await connection.db.collection("problems");
	return problems;
}
