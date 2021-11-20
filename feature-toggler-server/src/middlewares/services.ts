import { Request, Response, NextFunction } from "express";
import dbInterface from "../db";
import { DatabaseApi } from "../db/api";

const services = {
	db: new DatabaseApi(dbInterface),
};

const exposeServices = async (req: Request, res: Response, next: NextFunction) => {
	req.services = services;
	next();
};

export default exposeServices;
