import express, { Request, Response, NextFunction} from 'express';
import dbInterface from '../../db';
const featuresAndProjects = express();

featuresAndProjects.get("/", async (req: Request, res: Response) => {
    const db = req.services?.db;
	res.cookie(`mycookie`,`the cookie value`,{
        maxAge: 5000,
        // expires works the same as the maxAge
        secure: false,
        httpOnly: false,
        sameSite: 'lax'
    });
	if (req.user) {
		const { email } = req.user;
		if (db) {
			try {
				const allProjects = await db.getAllProjectsForUser(email);
				if (!allProjects || !allProjects.length) {
					res.status(404).send("No projects found!");
					return;
				}
				res.status(200).send(allProjects);
			} catch (err) {
				console.log("Error getting project for user with email: ", err);
			}
		}
	} else {
		res.status(401).send("Unauthorized!");
	}
});

featuresAndProjects.post("/delete", async (req: Request, res: Response) => {
    const db = req.services?.db;
	const { projectid: projectId } = req.query;
	if (req.user && projectId) {
		const { email } = req.user;
		if (db) {
			try {
				const deleteProjectResponse = await db.deleteProject(projectId as string, email);
				if (!deleteProjectResponse) {
					res.status(404).send("Project not deleted!");
					return;
				}
				res.status(200).send(deleteProjectResponse);
			} catch (err) {
				console.log("DELETE project error:  ", err);
				res.status(400).send('Could not delete');
			}
		}
	} else {
		res.status(401).send("Unauthorized!");
	}
});

featuresAndProjects.post("/new", async (req: Request, res: Response) => {
    const db = req.services?.db;
	const { projectname, active } = req.query;
	const isActive = active === 'true';
	if (req.user) {
		const { email } = req.user;
		if (db) {
			const newProject = await db.newProject(email, projectname as string, isActive, true);
			if(newProject === -1) {
				res.status(400).send(JSON.stringify("The project exists!"));
			}
			if (!newProject || !newProject.length) {
				res.status(404).send("No projects found!");
				return;
			}
			res.status(200).send(newProject[0]);
		}
	} else {
		res.status(401).send("Unauthorized!");
	}
});

featuresAndProjects.get("/features", async (req: Request, res: Response) => {
    const db = req.services?.db;
	if (req.user) {
		const { email } = req.user;
		if (db) {
			try {
				const allFeatures = await db.getAllFeaturesForCurrentUser(email);
				if (!allFeatures || !allFeatures.length) {
					res.status(404).send("No projects found!");
					return;
				}
				res.status(200).send(allFeatures);
			} catch (err) {
				console.log("Error getting project for user with email: ", err);
			}
		}
	} else {
		res.status(401).send("Unauthorized!");
	}
})

featuresAndProjects.post('/features/update/:projectId/:featureName', async (req: Request, res: Response) => {
	const {projectId, featureName} = req.params;
	const { enabled } = req.query;
	const db = req.services?.db;
	if (req.user) {
		try {
			const toggleFeature = await db?.updateFeature(projectId, featureName, enabled);
			if(toggleFeature) {
				res.status(200).send(toggleFeature);
				return;
			}
			res.status(500).send();
		} catch (err) {
			console.log('UPDATE ERROR: ', err);
		}
	}
})

featuresAndProjects.delete('/features/delete/:projectId/:featureName', async (req: Request, res: Response) => {
	const {projectId, featureName} = req.params;
	const db = req.services?.db;
	if (req.user) {
		const feature = await db?.getFeatureStateById(projectId, featureName as string);
		const deletedFeature = await db?.deleteFeatureById(projectId, featureName as string);
		res.status(200).send(feature);
	}
});

featuresAndProjects.post('/features/new', async (req: Request, res: Response) => {
	const {projectid, name, value, description, enabled } = req.query;
	const db = req.services?.db;
	const isEnabled = enabled === 'true';
	if (req.user) {
		const { email } = req.user;
		try {
			const newFeature = await db?.newFeature(email, projectid as string, name as string, value as string, description as string, isEnabled);
			if(newFeature) {
				res.status(200).send(newFeature);
			}
			res.status(400).send({error: 'Feature exists'});
		} catch (err) {
			console.log('NEW FEATURE ERROR: ', err);
		}
	}
});

export default featuresAndProjects;