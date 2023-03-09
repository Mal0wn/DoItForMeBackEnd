import express from "express";
const addressController = require("../controllers/address.controller");
const addressRouter = express.Router();

addressRouter
	.route("/")
    .put(addressController.update)
	.post(addressController.create);
	
addressRouter
	.route('/mission/:id')
    .get(addressController.findByMissionID);
	
addressRouter
	.route('/user/:id')
	.get(addressController.findByUserID);

addressRouter 
	.route('/:id')
    .get(addressController.id)
	.delete(addressController.delete);
	
export default addressRouter;