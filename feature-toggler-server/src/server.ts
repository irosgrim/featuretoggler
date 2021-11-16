import express from "express";
import cors from 'cors';
import checkAuthorization from "./middlewares/auth";
import exposeServices from "./middlewares/services";
import features from "./routes/client/features";
import featuresAndProjects from "./routes/dashboard/featuresAndProjects";
import checkFtKey from "./middlewares/checkFtKey";
import account from "./routes/dashboard/account";

const server = () => {
	const app = express();
	app.use(cors());
	app.use(express.json());
	app.use("/api/projects", checkAuthorization, exposeServices, featuresAndProjects)
	app.use("/api/account", checkAuthorization, exposeServices, account);
	app.use("/features", checkFtKey, exposeServices, features);
	return app;
};

export default server;
