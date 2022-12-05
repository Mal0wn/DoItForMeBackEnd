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
    /**
     * Find current user by id
     * @param req 
     * @param res 
     * @param next 
     * @returns all information about the current user
     */
    getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            //TODO récupérer l'id de l'utilisateur courant
            const user = await userService.findByIdWithMissionCreated(req.params.id);
            res.json(user);
            return;
        } catch (error) {
            next("salut");
            return;
        }
    },
    updateCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // TODO si le userId ne correspond pas au currentUserId, on renvoie une erreur
            const user = await userService.update(req.body);
            res.json(user);
            return;
        } catch (error) {
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
            const users = await userService.findByIdWithMissionCreated(req.params.id);
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    }
}
module.exports = userController;