"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("../middleware/error.middleware");
const express = require("express");
const userRouter = require("./user.route");
const router = express.Router();
const API_USER = `/user`;
//add your router here
router.use(API_USER, userRouter);
router.use(error_middleware_1.logError);
router.use(error_middleware_1.returnError);
module.exports = router;
