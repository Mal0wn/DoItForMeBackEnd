import express from "express";
import authenticationController from "../controllers/authentication.controller";

const authenticationRouter = express.Router();

//Only one route for the connexion
authenticationRouter.post("/",authenticationController.connexion);

export default authenticationRouter