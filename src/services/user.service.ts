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

    findAllById: async (userID: string) => {
        const id = parseInt(userID);
        if (isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionCreated: true,
                missionMade: true,
                received: true,
                sent: true,
                address: true
            }
        });
        if( users.length < 1){
            throw new Api404Error(`No User Found for id = ${userID}`);
        }
        return users;
    },
    findById: async (userID: string) => {
        const id = parseInt(userID);
        if (isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.find({
            where: {
                id: id
            }
        });
        if( users.length < 1){
            throw new Api404Error(`No User Found for id = ${userID}`);
        }
        return users;
    },

    findAll: async () => {
        return UserRepository.find();
    },

    findByIdWithMissionCreated: async (userID: string) => {
        const id = parseInt(userID);
        if (isNaN(id)){
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
        if (isNaN(id)){
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

    update: async (user: User) => {
        return UserRepository.update( { id: user.id }, user);// return only id
    },

    getUserConvByMission: async (userID: string, missionID: string) => {
        const idUser = parseInt(userID);
        if (isNaN(idUser)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const idMission = parseInt(missionID);
        if (isNaN(idMission)){
            throw new Api400Error(`invalid Mission id ( = \'${missionID}\')`);
        }
        const users = await UserRepository.getUserConvByMission(idUser, idMission);
        if( users.length < 1){
            throw new Api404Error(`No Conversation Found`);
        }
        return users;
    },
    getAllUserIdConv: async (userID: string) => {
        const id = parseInt(userID);
        if (isNaN(id)){
            throw new Api400Error(`invalid User id ( = \'${userID}\')`);
        }
        const users = await UserRepository.getAllUserIdConv(id);
        if( users.length < 1){
            throw new Api404Error(`No Conversation Found`);
        }
        return users;
    }
}

module.exports = userService;