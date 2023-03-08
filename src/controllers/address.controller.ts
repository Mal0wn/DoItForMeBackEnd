const addressService = require("../services/address.service");
import { Request, Response , NextFunction } from "express";

const addressController = {
    id: async(req: Request, res: Response, next: NextFunction) => { 
		try {
		const address = await addressService.findByID(req.params.id)
		res.json(address[0]);
		} catch(error) {
			next(error);
			return;
		}

	},
	create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await addressService.create(req.body);
            res.json(id);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await addressService.delete(req.params.id);
            res.sendStatus(200);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const address = await addressService.update(req.body);
            res.json(address);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    findByUserID: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await addressService.findByUserID(req.params.id);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },
    findByMissionID: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await addressService.findByMissionID(req.params.id);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    }
}
module.exports = addressController;
