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
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns userId if token is valid, else return 401
     */
    checkToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = "";
            // Check if the authorization header is present and if it is a Bearer token
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                token = req.headers.authorization.split(' ')[1];
                // Decode the token and get the user id
                let decoded = jwt.decode(token, process.env.SECRET_KEY_JWT || '');
                let userId: number = decoded.id;
                
                return userId;
            } else {
                // If the header is not present or the token is not a Bearer token, return an error
                return res.status(401).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            next(error);
            return;
        }
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns Current user data
     */
    getCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let currentUserId = await userController.checkToken(req, res, next);
                        
            // If userId is not present or not a number, return an error
            if (currentUserId === undefined || currentUserId === null || typeof currentUserId !== 'number') {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // Find the user by id and return the user
            const user = await userService.findUserById(currentUserId);
            return res.status(200).json(user);

        } catch (error) {
            next(error);
            return;
        }
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns updated current user data
     */
    updateCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let currentUserId = await userController.checkToken(req, res, next);

            // Check if the user id in the token is the same as the user id in the request body
            const user = await userService.findUserById(currentUserId);
            if (req.body.id !== user.id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            
            // Update the user
            const userUpdated = await userService.updateUser(req.body);
            
            return res.status(200).json(userUpdated);

        } catch (error) {
            next(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    /**
     * 
     * @param oldPassword
     * @param newPassword
     * @param newPasswordConfirm
     * @returns changed password of current user and return the user
     */
    updatePassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            let currentUserId = await userController.checkToken(req, res, next);
            let oldPassword = req.body.oldPassword;
            let newPassword = req.body.newPassword;
            let newPasswordConfirm = req.body.newPasswordConfirm;
            
            if (newPassword !== newPasswordConfirm) {
                return res.status(400).json({ message: 'New password and new password confirm are not the same' });
            }

            // Update the user
            const userUpdated = await userService.updatePassword(currentUserId, oldPassword, newPassword);
            return res.status(200).json(userUpdated);

        } catch (error) {
            next(error);
            return;
        }
            
    },
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @param phrase // "DELETE MY ACCOUNT" allows you to confirm the intentional deletion of the account
     * @returns status code 200 if the user is deleted
     */
    deleteCurrentUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Check if token is valid
            let currentUserId = await userController.checkToken(req, res, next);
            // Check if the phrase is correct
            let phrase = req.body.phrase
            if (phrase !== "DELETE MY ACCOUNT") {
                return res.status(400).json({ message: 'Phrase is not correct' });
            }
            // Delete the user
            await userService.deleteUser(currentUserId);
            // Return a success message
            return res.status(200);
        } catch (error) {
            next(error);
            return;
        }
    }
}
module.exports = userController;