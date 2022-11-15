const missionService = require("../services/mission.service");
import { Request, Response , NextFunction } from "express";

const missionController = {

	getAll: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const missions = await missionService.findAllByTitle(req.params.title);
			res.json(missions);
			return;
		} catch (error) {
			console.log(error);
			next(error);
			return;
		}

	},
	create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const missionID = await missionService.create(req.body);
            console.log(missionID);
            res.json(missionID);
            return;
        } catch (error) {
            console.log(error);
            next(error);
            return;
        }
    },
	
	id: async(req: Request, res: Response, next: NextFunction) => { 
		try {
		const missions = await missionService.findById(req.params.id)
res.json(missions)
		} catch(error) {
			console.log(error);
			next(error);
			return;
		}

	},
}
module.exports = missionController;
