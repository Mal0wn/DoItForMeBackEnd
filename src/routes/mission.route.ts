import express from "express";
const missionController = require("../controllers/mission.controller");
const missionRouter = express.Router();

missionRouter
	.route("/")
	.get(missionController.getAll)
	.post(missionController.create);

missionRouter 
	.route('/:id')
    .get(missionController.id);

module.exports = missionRouter;