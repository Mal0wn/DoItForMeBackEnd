import { Api400Error, Api404Error } from "../errors/api.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repository/user.repository";

// https://typeorm.io/find-options
const userService = {

    findAllByFullName: async (firstName: string, lastName: string) => {
        if (firstName === ""){
            throw new Api400Error(`firstName empty.`);
        }else if(lastName === ""){
            throw new Api400Error(`lastName empty.`);
        }
        const users = await UserRepository.find({
            where: {
                firstname: firstName,
                lastname: lastName
            }
        });
        if( users.length === 0){
            throw new Api404Error(`User with firstName: ${firstName} and lastName: ${lastName} not found.`);
        }
        return users;
    },

    findAllByFullName2: async (firstname: string, lastname: string) => {
        return UserRepository.findAllByName(firstname, lastname);
    },// en fait ca fait la meme chose qu'au dessus mais ca utilise notre fonction custom

    findAll: async () => {
        return UserRepository.find();
    },

    findByIdWithMissionCreated: async (userID: string) => {
        const id = parseInt(userID);
        return UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionCreated: true
            }
        });
    },

    findByIdWithMissionMadeTitle: async (userID: string) => {
        const id = parseInt(userID);
        return UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionMade: {
                    title: true
                }
            }
        });
    },
    create: async (user: User) => {
        return UserRepository.save(user);// return only id
    }
}

module.exports = userService;