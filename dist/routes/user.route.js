"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
/* const UsersValidators = require("../validators/users.validators"); */
userRouter
    .route("/")
    .get(/* auth middleware, admin middleware,*/ user_controller_1.userController.getAll) // exemple if user has conditions for using the route
    .post(
//validate(UsersValidators.validateCreation, {}, {}),  // exemple for checking if all required data is present with express-validator
user_controller_1.userController.create);
userRouter
    .route('/name/:firstname/:lastname')
    .get(user_controller_1.userController.getByName);
userRouter
    .route('/:id')
    .get(user_controller_1.userController.id);
module.exports = userRouter;
