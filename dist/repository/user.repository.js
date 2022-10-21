"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const dataSource_1 = require("../dataSource");
const user_model_1 = require("../models/user.model");
//https://typeorm.io/select-query-builder
exports.UserRepository = dataSource_1.dataSource.getRepository(user_model_1.User).extend({
    findAllByName(firstName, lastName) {
        return this.createQueryBuilder("user")
            .where("user.firstname = :firstName", { firstName })
            .andWhere("user.lastname = :lastName", { lastName })
            .getMany();
    },
    // add other custom query builder functions here
});
