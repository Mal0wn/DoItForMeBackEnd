import { userService } from "../services/user.service";
import { Request, Response, NextFunction } from 'express';


export const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAll();
            throw new Api404Error(`User with id: ${req.params.id} not found.`)
            res.json(users);
            return;
        } catch (error) {
            // c'est ici qu'on peut assigner differents code http ( genre 400 bad request ou 500 internal error)
            console.log(error);
            res.status(500);
            return;
        }
    },
    getByName: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAllByFullName(req.params.firstname, req.params.lastname);
            res.json(users);
            return;
        } catch (error) {
            // c'est ici qu'on peut assigner differents code http ( genre 400 bad request ou 500 internal error)
            console.log(error);
            res.status(500);
            return;
        }
    }
}