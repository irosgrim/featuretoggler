import { Request, Response, NextFunction } from "express";

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
	req.user = {
		name: "ion",
		username: "ion",
		email: "ion@gmail.com",
	};
	console.log(`${req.user.name} is authorised`);
	next();
};

export default checkAuthorization;
