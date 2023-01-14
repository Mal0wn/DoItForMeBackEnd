import { Api400Error, Api404Error } from "../errors/api.error";
import { Mission } from "../models/mission.model";
import { MissionRepository } from "../repository/mission.repository";

const missionService = {

	findAllByTitle: async () => {
		return MissionRepository.find()
	},

	findById: async (missionId : string) => {
		const id = parseInt(missionId);
		if (!isNaN(id)){
            throw new Api400Error(`invalid Mission id ( = \'${missionId}\')`);
        }
		const mission = await MissionRepository.find({
			where: {
			id: id
			}
		})
        if( mission.length === 0){
            throw new Api404Error(`No Conversation Users Found for User id = ${missionId}`);
        }
	},
	create : async (mission : Mission) => {
		if (mission.id != 0){
			throw new Api400Error(`Mission id must be 0 for creation ( = \'${mission.id}\')`);
		}
		return MissionRepository.save(mission);
	},
	update : async (mission : Mission) => {
		if (mission.id == 0){
			throw new Api400Error(`Mission id can't be 0 for update ( = \'${mission.id}\')`);
		}
		return MissionRepository.update( {id: mission.id}, mission);
	},
	delete : async (id : string) => {
		const idMission = parseInt(id);
		if (!isNaN(idMission)){
            throw new Api400Error(`invalid Mission id ( = \'${idMission}\')`);
        }
		return MissionRepository.delete(idMission);
	},
}

module.exports = missionService;

