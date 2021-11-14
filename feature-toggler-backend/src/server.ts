import express from "express";
import cors from 'cors';
import checkAuthorization from "./middlewares/auth";
import exposeServices from "./middlewares/services";
import features from "./routes/client/features";
import featuresAndProjects from "./routes/dashboard/featuresAndProjects";
import checkFtKey from "./middlewares/checkFtKey";

const server = () => {
	const app = express();
	app.use(cors());
	app.use("/api/projects", checkAuthorization, exposeServices, featuresAndProjects)
	app.use("/features", checkAuthorization, checkFtKey, exposeServices, features);
	return app;
};

export default server;
