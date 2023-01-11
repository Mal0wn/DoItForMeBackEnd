const authenticationService = require("../services/authentication.service");

import { Request, Response , NextFunction } from "express";

const authenticationController = {

    connexion : async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const connexion = await authenticationService.findUser(req.body.email, req.body.password)
			console.log(connexion)
			res.json(connexion);
			return;
		} catch (error) {
			console.log(error)
			next(error);
			return;
		}
	},
}
export default authenticationController;
