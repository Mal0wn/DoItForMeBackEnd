import { logError, returnError } from '../middleware/error.middleware';
const express = require("express");
const userRouter = require("./user.route")
const missionRouter = require("./mission.route")
const router = express.Router();


const API_USER = `/user`;
const API_MISSION = `/mission`;
//add your router here
router.use(API_USER, userRouter);
router.use(API_MISSION, missionRouter)

router.use(logError);
router.use(returnError);

module.exports = router;