import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
const account = express();

const validateForm = [
	body("organization").isLength({ min: 1, max: 20 }).escape().withMessage("Organization name is invalid"),
	body("name").isLength({ min: 3, max: 20 }).isAlpha("en-US", { ignore: " " }).escape().withMessage("Invalid name"),
	body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric().escape().withMessage("Invalid username"),
	body("email").trim().isEmail().normalizeEmail().escape().withMessage("Invalid email"),
	body("password").isLength({ min: 6, max: 50 }).withMessage("Password must be minimum 6 characters"),
];

const errorFormatter = ({ msg }: { location: string; msg: string; param: string; value: any; nestedErrors: any }): string => {
	return `${msg}`;
};

const newAccount = async (req: Request, res: Response) => {
	const db = req.services?.db;
	// @ts-ignore
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		res.status(400).send({
			invalidFields: errors.mapped(),
		});
		return;
	}
	const { organization, name, username, email, password } = req.body;
	if (db) {
		const createNewAccount = await db.createNewAccount(organization, name, username, email, password);
		if (createNewAccount === "ok") {
			res.status(200).send("OK");
		}
	}
};

account.post("/new", validateForm, newAccount);

export default account;
