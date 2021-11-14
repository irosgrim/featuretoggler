import express, { NextFunction, Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
const account = express();

const validateForm =  [
    body('organization').isLength({min: 3, max: 20}).escape().withMessage('Must be between 3 and 20 characters'),
    body('name').isLength({min: 3, max: 20}).escape().withMessage('Must be between 3 and 20 characters'),
    body('username').trim().isLength({min: 3, max: 20}).escape().withMessage('Must be between 3 and 20 characters'),
    body('email').trim().isEmail().escape().withMessage('Invalid email'),
    body('password').isLength({ min: 6, max: 50 }).withMessage('Password must be minimum 6 characters'),
];

const newAccount = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors.mapped());
    if(!errors.isEmpty()) {
        res.status(400).send({
            invalidFields: Object.keys(errors.mapped()),
        });
        return;
    }

    res.status(200).send('OK');
}

account.post('/new', validateForm, newAccount);

export default account;