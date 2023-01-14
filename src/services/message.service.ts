import { Api400Error, Api404Error } from "../errors/api.error";
import { Message } from "../models/message.model";
import { MessageRepository } from "../repository/message.repository";

const missionService = {

	findAllByTitle: async () => {
		return MessageRepository.find()
	},

	findConversation: async (userID_1 : string, userID_2: string) => {
		const id1 = parseInt(userID_1);
		if (!isNaN(id1)){
            throw new Api400Error(`invalid User id 1 ( = \'${userID_1}\')`);
        }
        const id2 = parseInt(userID_2); 
		if (!isNaN(id2)){
            throw new Api400Error(`invalid User id 2 ( = \'${userID_2}\')`);
        }
		return MessageRepository.find({
			where: [
                { id_send: id1 , id_receive: id2},
                { id_send: id2 , id_receive: id1}
            ],
            order: {
                time: "DESC"
            }
		})

	},
    findByMission: async () => {

    },
	create : async (message : Message) => {
        message.time = new Date();
		return MessageRepository.save(message);
	}

}

module.exports = missionService;

