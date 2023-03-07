import express from "express";
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

/* const UsersValidators = require("../validators/users.validators"); */

userRouter
  .route("/")
  .get(/* auth middleware, admin middleware,*/  userController.getAll) // exemple if user has conditions for using the route
  .post(
    //validate(UsersValidators.validateCreation, {}, {}),  // exemple for checking if all required data is present with express-validator
    userController.create
  );

userRouter
  .route('/name/:firstname/:lastname')
  .get(userController.getByName);

userRouter
  .route('/created/:id')
  .get(userController.idCreator);
userRouter
  .route('/:id')
  .get(userController.idAll);

userRouter
  .route('/conversation/:id')
  .get(userController.conversations);

export default userRouter;
