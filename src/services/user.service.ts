import { parse } from "path";
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

    //findAllByFullName2: async (firstname: string, lastname: string) => {
    //    return UserRepository.findAllByName(firstname, lastname);
    //},// en fait ca fait la meme chose qu'au dessus mais ca utilise notre fonction custom

    findAll: async () => {
        return UserRepository.find();
    },

    findByIdWithMissionCreated: async (userID: string) => {
        const id = parseInt(userID);
        if (!isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionCreated: true
            }
        });
        if( users.length === 0){
            throw new Api404Error(`No User Found for id = ${userID}`);
        }
        return users;
    },

    findByIdWithMissionMadeTitle: async (userID: string) => {
        const id = parseInt(userID);
        if (!isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionMade: true
            }
        });
        if( users.length === 0){
            throw new Api404Error(`No User Found for id = ${userID}`);
        }
        return users;
    },
    create: async (user: User) => {
        return UserRepository.save(user);// return only id
    },
    
    findByConversations: async (userID: string) => {
        const id = parseInt(userID);
        if (!isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.getAllConversationUsers(id);
        if( users.length === 0){
            throw new Api404Error(`No Conversation Users Found for User id = ${userID}`);
        }
        return users;
    },
    findByConversationsMission: async (userID: string, missionID: string) => {
        const idUser = parseInt(userID);
        if (!isNaN(idUser)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const idMission = parseInt(missionID);
        if (!isNaN(idMission)){
            throw new Api400Error(`invalid Mission id ( = \'${missionID}\')`);
        }
        const users = await UserRepository.getAllConversationUsersByMission(idUser, idMission);
        if( users.length === 0){
            throw new Api404Error(`No User Found for Mission id = ${userID}`);
        }
        return users;
    },
}

module.exports = userService;