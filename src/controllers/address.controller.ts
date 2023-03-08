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
            const missionID = await addressService.update(req.body);
            console.log(missionID);
            res.json(missionID);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    findByUserID: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await addressService.search(req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },
    findByMissionID: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await addressService.searchPrice(req.query.min, req.query.max, req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },
    searchString: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await addressService.searchString(req.query.string, req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },

}
module.exports = addressController;
