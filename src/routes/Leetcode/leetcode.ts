import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

router.get("/:problemSlug", async (req: Request, res: Response) => {
	const { problemSlug } = req.params;
});

export default router;
