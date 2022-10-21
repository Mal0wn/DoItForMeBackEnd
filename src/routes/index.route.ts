import { logError, returnError } from '../middleware/error.middleware';
const express = require("express");
const userRouter = require("./user.route")
const router = express.Router();

const API_USER = `/user`;
//add your router here
router.use(API_USER, userRouter);

router.use(logError);
router.use(returnError);

module.exports = router;