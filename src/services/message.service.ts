import { Api400Error, Api404Error } from "../errors/api.error";
import { Message } from "../models/message.model";
import { MessageRepository } from "../repository/message.repository";

const missionService = {

	findById: async (messageid : string) => {
        const id = parseInt(messageid); 
		if (isNaN(id)){
            throw new Api400Error(`Invalid Message id: ${messageid}`);
        }
        const messages = await MessageRepository.find({
			where: { 
                id: id
            }
		});
        if( messages.length < 1){
            throw new Api404Error(`No Message Found for id: ${messageid}`);
        }
		return messages;
    },
	findByConversation: async (userID_1 : string, userID_2: string, missionID: string) => {
		const id1 = parseInt(userID_1);
		if (isNaN(id1)){
            throw new Api400Error(`Invalid User id 1: ${userID_1}`);
        }
        const id2 = parseInt(userID_2); 
		if (isNaN(id2)){
            throw new Api400Error(`Invalid User id 2: ${userID_2}`);
        }
        const id = parseInt(missionID); 
		if (isNaN(id)){
            throw new Api400Error(`Invalid Mission id: ${missionID}`);
        }
		const messages = await MessageRepository.find({
			where: [
                { id_send: id1 , id_receive: id2},
                { id_send: id2 , id_receive: id1},
                { id_mission: id}
            ],
            order: {
                time: "DESC"
            }
		});
        if( messages.length < 1){
            throw new Api404Error(`No Message Found`);
        }
		return messages;
	},
    findByMission: async (missionID: string) => {
        const id = parseInt(missionID); 
		if (isNaN(id)){
            throw new Api400Error(`Invalid Mission id: ${missionID}`);
        }
        const messages = await MessageRepository.find({
			where: { 
                id_mission: id
            },
            order: {
                id_send: "ASC",
                time: "DESC"
            }
		});
        if( messages.length < 1){
            throw new Api404Error(`No Message Found`);
        }
		return messages;
    },
    findBySender: async (senderID: string) => {
        const id = parseInt(senderID); 
		if (isNaN(id)){
            throw new Api400Error(`Invalid User id: ${senderID}`);
        }
        const messages = await MessageRepository.find({
			where: { 
                id_send: id
            },
            order: {
                time: "DESC"
            }
		});
        if( messages.length < 1){
            throw new Api404Error(`No Message Found`);
        }
		return messages;
    },
	create : async (message : Message) => {
        message.time = new Date();
        message.id = 0;
		const tmp = await MessageRepository.save(message);
        return tmp.id;
	},
    delete : async (id : number) => {
		const status = await MessageRepository.delete(id);
		if( status.affected === 0){
            throw new Api404Error(`Delete failed, No entry for id: ${id}`);
        }
		return;
	}
}

module.exports = missionService;

