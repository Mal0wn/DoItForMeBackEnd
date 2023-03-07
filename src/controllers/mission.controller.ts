const missionService = require("../services/mission.service");
import { Request, Response , NextFunction } from "express";
import { BaseError } from "../errors/api.error";

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

	},
	create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const missionID = await missionService.create(req.body);
            console.log(missionID);
            res.json(missionID);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const missionID = await missionService.delete(req.params.id);
            console.log(missionID);
            res.json(missionID);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const missionID = await missionService.update(req.body);
            console.log(missionID);
            res.json(missionID);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	id: async(req: Request, res: Response, next: NextFunction) => { 
		try {
		const missions = await missionService.findById(req.params.id)
		res.json(missions);
		} catch(error) {
			next(error);
			return;
		}

	},
}
module.exports = missionController;
