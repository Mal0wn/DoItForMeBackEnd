import { Api400Error, Api404Error } from "../errors/api.error";
import { Mission } from "../models/mission.model";
import { MissionRepository } from "../repository/mission.repository";
import { Address } from "../models/address.model";

const missionService = {
    findAll:async()=>{
        return await MissionRepository.find();
    },
    findAllWithUser:async()=>{
        return await MissionRepository.findAllWithUser();
        
    },
	findById: async (missionId : string) => {
		const id = parseInt(missionId);
		if( isNaN(id)){
            throw new Api400Error(`Invalid Mission ID : ${missionId}`);
        }
		const mission = await MissionRepository.find({
			where: {
			id: id
			},
            relations: {
                creator: true,
                address: true
              }
		})
        if( mission.length < 1){
            throw new Api404Error(`No Mission Found for id: ${missionId}`);
        }
		return mission;
	},
	create : async (mission : Mission) => {
		mission.id = 0;
		const tmp = await MissionRepository.save(mission);
        return tmp.id;
	},
	update : async (mission : Mission) => {
		return await MissionRepository.save(mission);
	},
	delete : async (id : number) => {
		const status = await MissionRepository.delete(id);
		if( status.affected === 0){
            throw new Api404Error(`Delete failed, No entry for id: ${id}`);
        }
		return;
	},
	search: async (lat: string, long: string, km: string) => {
        const latitude = parseFloat(lat);
        if (isNaN(latitude)){
            throw new Api400Error(`invalid Latitude ( = \'${lat}\')`);
        }
        const longitude = parseFloat(lat);
        if (isNaN(longitude)){
            throw new Api400Error(`invalid Longitude ( = \'${long}\')`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( longitude*(Math.PI*180));
        const res = await MissionRepository.search(latitude, longitude, latRadius, longRadius);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    },
	searchPrice: async (min: number, max: number, lat: string, long: string, km: string) => {
        const latitude = parseFloat(lat);
        if (isNaN(latitude)){
            throw new Api400Error(`invalid Latitude ( = \'${lat}\')`);
        }
        const longitude = parseFloat(lat);
        if (isNaN(longitude)){
            throw new Api400Error(`invalid Longitude ( = \'${long}\')`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( longitude*(Math.PI*180));
        const res = await MissionRepository.searchPrice(latitude, longitude, latRadius, longRadius, min, max);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    },
	searchString: async (str: string, lat: string, long: string, km: string) => {
		const latitude = parseFloat(lat);
        if (isNaN(latitude)){
            throw new Api400Error(`invalid Latitude ( = \'${lat}\')`);
        }
        const longitude = parseFloat(lat);
        if (isNaN(longitude)){
            throw new Api400Error(`invalid Longitude ( = \'${long}\')`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( longitude*(Math.PI*180));
        const res = await MissionRepository.searchString(latitude, longitude, latRadius, longRadius, str);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    }
}

module.exports = missionService;
