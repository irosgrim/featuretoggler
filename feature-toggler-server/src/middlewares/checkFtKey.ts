import { Request, Response, NextFunction } from "express";

const checkFtKey = (req: Request, res: Response, next: NextFunction) => {
	// const user = req.user;
	// if(!user) {
	//     res.status(403).send('Unauthorized');
	//     return;
	// }
	// if(user?.email) {
	//     const projectKey = req.headers["ft-key"] as string;
	//     if (!projectKey) {
	//         res.status(400).send("Bad ft-key");
	//         return;
	//     }
	//     req.projectKey = projectKey;
	// }
	const projectKey = req.headers["ft-key"] as string;
	if (!projectKey) {
		res.status(400).send("Bad ft-key");
		return;
	}
	req.projectKey = projectKey;
	next();
};

export default checkFtKey;
