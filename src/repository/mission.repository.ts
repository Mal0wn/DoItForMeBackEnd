import { dataSource } from "../dataSource";
import { Address } from "../models/address.model";
import { Mission } from "../models/mission.model";
import { User } from "../models/user.model";

export const MissionRepository = dataSource.getRepository(Mission).extend({
	findAllByTitle(title : string): Promise<Mission[]> {
		return this.createQueryBuilder("mission")
			.where("mission.title = :title", {title})
			.getMany();
	},
	findAllWithUser(): Promise<Mission[]> {
		return this.createQueryBuilder('mission')
		.leftJoinAndSelect('mission.creator', 'creator')
		.leftJoinAndSelect('mission.maker', 'maker')
		.getMany();

	  },
	
	findById(id : number): Promise<Mission> {
		return this.createQueryBuilder("mission")
		.innerJoinAndMapOne("mission.address", Address, "a", "a.id_mission = mission.id")
		.innerJoinAndMapOne("mission.creator", User, "u", "u.id = mission.id_create")
		.where("mission.id = :id", { id })
		.getOneOrFail()
	},
	search(latitude: number, longitude: number, latRadius: number, longRadius: number): Promise<Mission[]> {
        return this.createQueryBuilder("mission")
        .innerJoinAndMapOne("mission.address", Address, "a", "a.id_mission = mission.id")
		.innerJoinAndMapOne("mission.creator", User, "u", "u.id = mission.id_create")
		.where("a.latitude >= :minLat", { minLat: latitude - latRadius })
        .andWhere("a.latitude <= :maxLat", { maxLat: latitude + latRadius })
        .andWhere("a.longitude >= :minLong", { minLong: longitude - longRadius })
        .andWhere("a.longitude <= :maxLong", { maxLong: longitude + longRadius })
		.andWhere('mission.id_make is null')
        .getMany();
	},
	searchPrice(latitude: number, longitude: number, latRadius: number, longRadius: number, priceMin: number, priceMax: number): Promise<Mission[]> {
        return this.createQueryBuilder("mission")
        .innerJoinAndMapOne("mission.address", Address, "a", "a.id_mission = mission.id")
		.innerJoinAndMapOne("mission.creator", User, "u", "u.id = mission.id_create")
		.where("a.latitude >= :minLat", { minLat: latitude - latRadius })
        .andWhere("a.latitude <= :maxLat", { maxLat: latitude + latRadius })
        .andWhere("a.longitude >= :minLong", { minLong: longitude - longRadius })
        .andWhere("a.longitude <= :maxLong", { maxLong: longitude + longRadius })
		.andWhere('mission.id_make is null')
		.andWhere("mission.price <= :max", { max: priceMax })
		.andWhere("mission.price >= :min", { min: priceMin })
        .getMany();
	},
	searchString(latitude: number, longitude: number, latRadius: number, longRadius: number, str: string): Promise<Mission[]> {
        return this.createQueryBuilder("mission")
        .innerJoinAndMapOne("mission.address", Address, "a", "a.id_mission = mission.id")
		.innerJoinAndMapOne("mission.user", User, "u", "u.id = mission.id_create")
		.where("a.latitude >= :minLat", { minLat: latitude - latRadius })
        .andWhere("a.latitude <= :maxLat", { maxLat: latitude + latRadius })
        .andWhere("a.longitude >= :minLong", { minLong: longitude - longRadius })
        .andWhere("a.longitude <= :maxLong", { maxLong: longitude + longRadius })
		.andWhere('mission.id_make is null')
		.andWhere("mission.title like :string", { string:`%${str}%` })
        .getMany();
	},

});
