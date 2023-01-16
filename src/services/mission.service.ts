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
		/* if (mission.id != 0){
			throw new Api400Error(`Mission id must be 0 for creation ( = \'${mission.id}\')`);
		} */
		return MissionRepository.save(mission);
	},
	update : async (mission : Mission) => {
		const res = await MissionRepository.save(mission);
		if (res.id != mission.id){
            await MissionRepository.delete(res.id);
            throw new Api400Error(`No existing Mission for this id ( = \'${mission.id}\')`);
        }
        return res;
	},
	delete : async (id : string) => {
		const idMission = parseInt(id);
		if (!isNaN(idMission)){
            throw new Api400Error(`invalid Mission id ( = \'${idMission}\')`);
        }
		return MissionRepository.delete(idMission);
	},
	search: async (lat: string, long: string, km: string) => {
        const latitude = parseFloat(lat);
        if (!isNaN(latitude)){
            throw new Api400Error(`invalid Latitude ( = \'${lat}\')`);
        }
        const longitude = parseFloat(lat);
        if (!isNaN(longitude)){
            throw new Api400Error(`invalid Longitude ( = \'${long}\')`);
        }
        let kmRadius = parseInt(km);
        if (!isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( longitude*(Math.PI*180));
        const res = await MissionRepository.search(latitude, longitude, latRadius, longRadius);
    }
}

module.exports = missionService;

