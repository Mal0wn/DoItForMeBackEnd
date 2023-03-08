const userService = require("../services/user.service");
import { Request, Response, NextFunction } from 'express';


const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAll();
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    getByName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAllByFullName(req.params.firstname, req.params.lastname);
            res.json(users);
            return;
        } catch (error) {
            console.log('in error');
            next(error);
            return;
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userID = await userService.create(req.body);
            console.log(userID);
            res.json(userID);
            return;
        } catch (error) {
            console.log(error);
            next(error);
            return;
        }
    },
    id: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let user = [];
            if( req.query.full == "1"){
                user = await userService.findAllById(req.params.id);
            }else{
                user = await userService.findById(req.params.id);
            }
            res.json(user[0]);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    idCreator: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findByIdWithMissionCreated(req.params.id);
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    allConv: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getAllUserIdConv(req.params.id);
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    missionConv: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.getUserConvByMission(req.query.id, req.query.mission);
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    }
}
module.exports = userController;