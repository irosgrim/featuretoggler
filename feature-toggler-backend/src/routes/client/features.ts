import express from "express";
const featuresRoute = express();

featuresRoute.get("/", async (req, res) => {
	const db = req.services?.db;
	const projectKey = req.projectKey;
	if (req.user) {
		const { email } = req.user;
		if (db) {
			try {
				const projectFeatures = await db.getProjectForCurrentUserById(email, projectKey!);
				if (!projectFeatures || !projectFeatures.length) {
					res.status(404).send("Project not found!");
					return;
				}
				res.status(200).send(projectFeatures);
			} catch (err) {
				console.log("Error getting project by id: ", err);
			}
		}
	} else {
		res.status(401).send("Unauthorized!");
	}
});

export default featuresRoute;
