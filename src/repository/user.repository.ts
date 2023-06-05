import { format } from "path";
import { dataSource } from "../dataSource";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { Mission } from "../models/mission.model";
import { Address } from "../models/address.model";

//https://typeorm.io/select-query-builder
export const UserRepository = dataSource.getRepository(User).extend({
    findAllByName(firstName: string, lastName: string): Promise<User[]> {        
        return this.createQueryBuilder("user")
            .where("user.firstname = :firstName", { firstName })
            .andWhere("user.lastname = :lastName", { lastName })
            .getMany();
    },
    getUserConvByMission(id: number, missionID: number): Promise<User[]> {
		return this.createQueryBuilder("user")
        .innerJoinAndMapMany("user.sent", Message, "m", "(m.id_send = :id AND m.id_receive = user.id) OR (m.id_receive = :id AND m.id_send = user.id)", {id: id})
        .where("m.id_mission = :mid",{mid: missionID} )
        .andWhere("user.id != :id", {id: id})
        .getMany();
	},
    getAllUserIdConv(id: number): Promise<User[]> {
		return this.createQueryBuilder("user")
        .innerJoinAndMapMany("user.sent", Message, "m", "(m.id_send = :id AND m.id_receive = user.id) OR (m.id_receive = :id AND m.id_send = user.id)", {id: id})
        .andWhere("user.id != :id", {id: id})
        .getMany();
	},
});
