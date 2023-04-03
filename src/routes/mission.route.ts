import express from "express";
const missionController = require("../controllers/mission.controller");
const missionRouter = express.Router();

missionRouter
	.route("/")
	.get(missionController.getAll)
	.put(missionController.update)
	.post(missionController.create);

missionRouter 
	.route('/search')
    .get(missionController.search);
	
missionRouter 
	.route('/search/price')
    .get(missionController.searchPrice);
	
missionRouter 
	.route('/search/string')
    .get(missionController.searchString);
	
missionRouter 
	.route('/:id')
	.get(missionController.id)
	.delete(missionController.delete);
	
export default missionRouter;