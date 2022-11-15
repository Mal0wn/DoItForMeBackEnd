const missionService = require("../services/mission.service");
import { Request, Response , NextFunction } from "express";

const missionController = {

	getAll: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const missions = await missionService.findAllByTitle(req.params.title);
			res.json(missions);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},/*
	getById: async(req: Request, res: Response, next: NextFunction) => { 
		try {
		const missions = await missionService.findById(req.params.id)
res.json(missions)
		} catch(error) {
			next(error);
			return;
		}

	}*/
}
module.exports = missionController;
