import express from "express";
const missionController = require("../controllers/mission.controller");
const missionRouter = express.Router();

missionRouter
.route("/")
.get(missionController.getAll)
//.post(missionController.create);


module.exports = missionRouter;