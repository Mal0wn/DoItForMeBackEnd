/* Importing the authenticationService file. */
const authenticationService = require("../services/authentication.service");

/* Importing the Request, Response and NextFunction from the express module. */
import { Request, Response , NextFunction } from "express";

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
}
export default authenticationController;
