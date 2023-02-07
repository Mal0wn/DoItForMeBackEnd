const userService = require("../services/user.service");
import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';


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
            const users = await userService.findByIdWithMissionCreated(req.params.id);
            res.json(users);
            return;
        } catch (error) {
            next(error);
            return;
        }
    },
    currentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = "";
            // Check if the authorization header is present and if it is a Bearer token     
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                token = req.headers.authorization.split(' ')[1];
                // Decode the token and get the user id
                let decoded = jwt.decode(token, process.env.SECRET_KEY_JWT || '');
                let userId = decoded.id;
                // Find the user by id and return the user
                const user = await userService.findUserById(userId);
                return res.json(user);
            } else {
                // If the header is not present or the token is not a Bearer token, return an error
                return res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            next(error);
            return;
        }
    },
    updateCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = "";
            // Check if the authorization header is present and if it is a Bearer token     
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                token = req.headers.authorization.split(' ')[1];
                // Decode the token and get the user id
                let decoded = jwt.decode(token, process.env.SECRET_KEY_JWT || '');
                let currentUserId = decoded.id;
                // Check if the user id in the token is the same as the user id in the request body
                const user = await userService.findUserById(currentUserId);
                if (req.body.id !== user.id) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                // Update the user
                const userUpdated = await userService.update(req.body);
                
                return res.json(userUpdated);
            } else {
                // If the header is not present or the token is not a Bearer token, return an error
                return res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            next(error);
            return;
        }
    },
}
module.exports = userController;