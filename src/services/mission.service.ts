import { Api400Error, Api404Error } from "../errors/api.error";
import { Mission } from "../models/mission.model";
import { MissionRepository } from "../repository/mission.repository";

const missionService = {

	findAllByTitle: async () => {
		return MissionRepository.find()
	},

	findById: async (missionId : string) => {
		const id = parseInt(missionId); 
		return MissionRepository.find({
			where: {
			id: id
			}
		})

	},
	create : async (mission : Mission) => {
		return MissionRepository.save(mission);
	}

}

module.exports = missionService;

