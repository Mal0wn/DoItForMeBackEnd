const missionService = require("../services/mission.service");
const addressService = require("../services/address.service")
import { Request, Response , NextFunction } from "express";
import { BaseError } from "../errors/api.error";
import addressRouter from "../routes/address.route";

const missionController = {

	getAll: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const missions = await missionService.findAll(req.params.title);
			res.json(missions);
			return;
		} catch (error) {
			next(error);
			return;
		}

	},
    getAllWithUser: async (req: Request, res: Response, next: NextFunction) => { 
		try {
			const missions = await missionService.findAllWithUser();
			res.json(missions);
			return;
		} catch (error) {
			next(error);
			return;
		}
	},
	create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let tmp = req.body.id_create
            console.log("CREATE MISSION CONTROLLER")
            console.log(req.body)
            const id = await missionService.create(req.body);
            // TO DO : Debug address 
            console.log("ID ID ID " + req.body.id_create)
            let address = await addressService.findByID(2)
            address[0].id_user = null
            console.log(address[0])
            address[0].id_mission = id
            await addressService.create(address[0]) 
            res.json(id);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            await missionService.delete(req.params.id);
            res.sendStatus(200);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const mission = await missionService.update(req.body);
            res.json(mission);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
	id: async(req: Request, res: Response, next: NextFunction) => { 
		try {
		const mission = await missionService.findById(req.params.id)
		res.json(mission[0]);
		} catch(error) {
			next(error);
			return;
		}

	},
    search: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await missionService.search(req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },
    searchPrice: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await missionService.searchPrice(req.query.min, req.query.max, req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },
    searchString: async(req: Request, res: Response, next: NextFunction) => { 
        try {
        const missions = await missionService.searchString(req.query.string, req.query.lat, req.query.long, req.query.radius);
        res.json(missions);
        } catch(error) {
            next(error);
            return;
        }
    },

}
module.exports = missionController;
