import { format } from "path";
import { dataSource } from "../dataSource";
import { User } from "../models/user.model";

//https://typeorm.io/select-query-builder
export const UserRepository = dataSource.getRepository(User).extend({
    findAllByName(firstName: string, lastName: string): Promise<User[]> {
        return this.createQueryBuilder("user")
            .where("user.firstname = :firstName", { firstName })
            .andWhere("user.lastname = :lastName", { lastName })
            .getMany();
    },

    getAllConversationUsers(id : number): Promise<User[]> {
        const test = this.createQueryBuilder("user")
        .innerJoinAndSelect("message", "m", "m.id_send = user.id")
        .groupBy("user.id")
        .getMany();
        return test;
	},

    /* getAllConversationUsers(id : number): string {
        const test = this.createQueryBuilder()
        .select("user.*, m.*")
        .innerJoin("message", "m", "m.id_send = user.id")
        .groupBy("id")
        .getQuery();
        return test;
	}, */

    getAllConversationUsersByMission(id : number, missionID: number): Promise<User[]> {
        /* const test = this.query(`
            SELECT * FROM user WHERE id IN ( 
                (
                    SELECT u1.id FROM user u1
                    INNER JOIN message m1 ON u1.id = m1.id_sender 
                    WHERE m1.id_mission = ${missionID}
                )
            ) AND user.id != ${id} GROUP BY user.id`); */
        const test = this.createQueryBuilder("user")
        .innerJoin("user.id", "message", "message.id_send = user.id")
        //.andWhere("message.lastname = :lastName", { lastName })
        .groupBy("id")
        .getMany();

        console.log("test="+test)
        return test;
	},

    /* getAllConversationUsersByMission(id: number): Promise<User[]> {
		return this.createQueryBuilder("conversations")
        .distinctOn(["user.id"])
        .innerJoin("user.sent", "message")
        .andWhere("message.id_mission = :mission", { mission: id_mission})
        .innerJoin("user.received", "message")
        .andWhere("message.id_mission = :mission", { mission: id_mission})
		.getMany();
	}, */
});
