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

    /**
     * Find one user by id
     * @param userID
     * @returns 
     */
    findOneById: async (userID: string) => {
        const id = parseInt(userID);
        return UserRepository.findOne({
            where: {
                id: id
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
    },
    
    update: async (user: User) => {
        const userToUpdate = await UserRepository
            .findOne({
                where: {
                    id: user.id
                }
            });

        if (userToUpdate == undefined) {
            throw new Api404Error(`User with id: ${user.id} not found.`);
        }

        userToUpdate.firstname = user.firstname;
        userToUpdate.lastname = user.lastname;
        userToUpdate.email = user.email;
        userToUpdate.missionMade = user.missionMade;
        userToUpdate.missionCreated = user.missionCreated;
        
        return UserRepository.save(userToUpdate);
    },
}

module.exports = userService;