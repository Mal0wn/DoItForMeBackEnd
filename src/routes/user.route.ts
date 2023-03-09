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
  .route('/conversation/mission')
  .get(userController.missionConv);

userRouter
  .route('/conversation/:id')
  .get(userController.allConv);

userRouter
  .route('/currentUser/getCurrentUser')
  .get(userController.getCurrentUser)
userRouter
  .route('/currentUser/updateCurrentUser')
  .put(userController.updateCurrentUser);
userRouter
  .route('/currentUser/updatePassword')
  .put(userController.updatePassword);
userRouter
  .route('/currentUser/deleteCurrentUser')
  .delete(userController.deleteCurrentUser);
  
userRouter  
  .route('/:id')
  .get(userController.id);

export default userRouter;
