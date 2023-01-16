import { dataSource } from "../dataSource";
import { Mission } from "../models/mission.model";

export const MissionRepository = dataSource.getRepository(Mission).extend({
	findAllByTitle(title : string): Promise<Mission[]> {
		return this.createQueryBuilder("mission")
			.where("mission.title = :title", {title})
			.getMany();
	},
	
	findById(id : number): Promise<Mission> {
		return this.createQueryBuilder("mission")
		.where("mission.id = :id", { id })
		.getOneOrFail()
	},
	search(latitude: number, longitude: number, latRadius: number, longRadius: number): Promise<Mission[]> {
        return this.createQueryBuilder("user")
        .innerJoinAndSelect("address", "a", "a.id_mission = mission.id")
		.where("a.latitude > :minLat", { minLat: latitude - latRadius })
        .andWhere("a.latitude < :maxLat", { maxLat: latitude + latRadius })
        .andWhere("a.longitude > :minLong", { minLong: longitude - longRadius })
        .andWhere("a.longitude < :maxLong", { maxLong: longitude + longRadius })
        .getMany();
	},
});
