import { Api400Error, Api404Error } from "../errors/api.error";
import { Mission } from "../models/mission.model";
import { Geoposition } from "../models/geoposition.model";
import { MissionRepository } from "../repository/mission.repository";

const missionService = {
	findById: async (missionId : string) => {
		const id = parseInt(missionId);
		if( isNaN(id)){
            throw new Api400Error(`Invalid Mission ID : ${missionId}`);
        }
		const mission = await MissionRepository.find({
			where: {
			id: id
			}
		})
        if( mission.length < 1){
            throw new Api404Error(`No Mission Found for id: ${missionId}`);
        }
		return mission;
	},
	create : async (mission : Mission) => {
		const test = await MissionRepository.find({
			where: {
			id: mission.id
			}
		});
		if( test.length > 0){
            throw new Api400Error(`Mission Already exist for id: ${mission.id}`);
        }
		const missionCreated = await MissionRepository.save(mission);
	},
	update : async (mission : Mission) => {
		return await MissionRepository.save(mission);
	},
	delete : async (id : number) => {
		const status = await MissionRepository.delete(id);
		if( status.affected === 0){
            throw new Api400Error(`Delete failed, No entry for id: ${id}`);
        }
		return;
	},
	searchGeo: async (geo: Geoposition, km: string) => {
        if (isNaN(geo.latitude)){
            throw new Api400Error(`invalid Latitude`);
        }
        if (isNaN(geo.longitude)){
            throw new Api400Error(`invalid Longitude`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        //Minimal Calculation of search radius according to earth curve
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( geo.longitude*(Math.PI*180));
        const res = await MissionRepository.search(geo.latitude, geo.longitude, latRadius, longRadius);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    },
	searchBounty: async (min: number, max: number, geo: Geoposition, km: string) => {
        if (isNaN(geo.latitude)){
            throw new Api400Error(`invalid Latitude`);
        }
        if (isNaN(geo.longitude)){
            throw new Api400Error(`invalid Longitude`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( geo.longitude*(Math.PI*180));
        const res = await MissionRepository.searchPrice(geo.latitude, geo.longitude, latRadius, longRadius, min, max);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    },
	searchString: async (str: string, geo: Geoposition, km: string) => {
		if (isNaN(geo.latitude)){
            throw new Api400Error(`invalid Latitude`);
        }
        if (isNaN(geo.longitude)){
            throw new Api400Error(`invalid Longitude`);
        }
        let kmRadius = parseInt(km);
        if (isNaN(kmRadius)){
            throw new Api400Error(`invalid Range ( = \'${km}\')`);
        }
        const latRadius = kmRadius / 110.56;
        const longRadius = kmRadius / 111.11 * Math.cos( geo.longitude*(Math.PI*180));
        const res = await MissionRepository.searchString(geo.latitude, geo.longitude, latRadius, longRadius, str);
        if( res.length < 1){
            throw new Api404Error(`No Mission Found`);
        }
        return res;
    }
}

module.exports = missionService;

