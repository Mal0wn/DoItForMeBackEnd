/* Importing the authenticationService file. */
const authenticationService = require("../services/authentication.service");

/* Importing the Request, Response and NextFunction from the express module. */
import { Request, Response , NextFunction } from "express";
import { UserRepository } from "../repository/user.repository";

const authenticationController = {

    connexion : async (req: Request, res: Response, next: NextFunction) => { 
		try {
			await authenticationService.findUser(req.body.email, req.body.password)
			.then((ress:any) => res.json(ress))
			.catch((error: any) => {
				res.send(error)
			})
		} catch (error) {
			console.log(error)
			next(error);
			return;
		}
	},
	inscription : async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Check if the email already exist
			UserRepository.findOne({ where: { email: req.body.email } })
			.then((user:any) => {
				if (user) {
					return res.status(400).json({ message: "email already exist" });
				}
			})
			.catch((error:any) => {
				console.log(error)
			})
			// Create the user
			await authenticationService.inscription(req.body);
			// Return a message
			res.status(201).json({ message: "User created" });
		} catch (error) {
			next(error);
			return;
		}
	}
}
export default authenticationController;
