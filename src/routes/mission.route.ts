import express from "express";
const missionController = require("../controllers/mission.controller");
const missionRouter = express.Router();

missionRouter
	.route("/")
	.get(missionController.getAll)
	.put(missionController.update)
	.post(missionController.create);

missionRouter 
	.route('/:id')
    .get(missionController.id)
	.delete(missionController.delete);

export default missionRouter