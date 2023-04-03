import express from "express";
const messageController = require("../controllers/message.controller");
const messageRouter = express.Router();

messageRouter
	.route("/")
	.post(messageController.create);
	
messageRouter
	.route('/conversation')
    .get(messageController.findByConversation);
	
messageRouter
	.route('/mission/:id')
    .get(messageController.findByMission);
	
messageRouter
	.route('/user/:id')
	.get(messageController.findBySender);

messageRouter 
	.route('/:id')
    .get(messageController.id)
	.delete(messageController.delete);
	
export default messageRouter;