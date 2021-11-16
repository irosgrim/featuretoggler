import express from "express";
const featuresRoute = express();

featuresRoute.get("/", async (req, res) => {
	const db = req.services?.db;
	const projectKey = req.projectKey;
	if (projectKey) {
		if (db) {
			try {
				const project = await db.getProjectById(projectKey);
				if(!project || !project.length) {
					res.status(404).send("No project found");
					return;
				}
				const projectFeatures = await db.getAllFeaturesForProject(projectKey);
				res.status(200).send(projectFeatures);
			} catch (err) {
				console.log("Error getting the features for project: ", err);
			}
		}
	} else {
		res.status(400).send("No project id provided!");
	}
});

export default featuresRoute;
