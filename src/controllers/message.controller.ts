const messageService = require("../services/message.service");
import { Request, Response , NextFunction } from "express";
import { BaseError } from "../errors/api.error";

const missionController = {
    id: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const message = await messageService.findById(req.params.id);
			res.json(message[0]);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},
	findByConversation: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const messages = await messageService.findByConversation(req.query.uid1, req.query.uid2, req.query.mission);
			res.json(messages);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},
    findByMission: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const messages = await messageService.findByMission(req.params.id);
			res.json(messages);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},
    findBySender: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const messages = await messageService.findBySender(req.params.id);
			res.json(messages);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},
	create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await messageService.create(req.body);
            res.json(id);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await messageService.delete(req.params.id);
            res.sendStatus(200);
            return;
        } catch (error) {
            next(error);
            return;
        }
    }
}
module.exports = missionController;
