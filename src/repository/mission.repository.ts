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
	async createMission(mission : Mission ):Promise<void>{
		await dataSource
		.createQueryBuilder()
		.insert()
		.into('mission')
		.values([
			mission
		])
		.execute()
	},
});

