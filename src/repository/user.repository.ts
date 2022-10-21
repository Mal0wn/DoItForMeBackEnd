const dataSource = require("../dataSource");
import { User } from "../models/user.model";

//https://typeorm.io/select-query-builder
export const UserRepository = dataSource.getRepository(User).extend({
    findAllByName(firstName: string, lastName: string): Promise<User[]> {
        return this.createQueryBuilder("user")
            .where("user.firstname = :firstName", { firstName })
            .andWhere("user.lastname = :lastName", { lastName })
            .getMany();
    },
    // add other custom query builder functions here
});
