import { parse } from "path";
import { Api400Error, Api404Error } from "../errors/api.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repository/user.repository";
import bcrypt from "bcrypt";

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
    findUserById: async (userId: number) => {
        return UserRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                missionCreated: true,
                missionMade: true,
                received: true,
                sent: true,
                address: true
            }
        });
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
    },
    updateUser: async (user: User) => {
        // Get user from database
        let dbUser = UserRepository.findOne({
            where: {
                id: user.id
            },
            relations: {
                address: true
            }
        }).then((dbUser) => {
            // check if user exist in database
            if (!dbUser){
                throw new Api404Error(`User with id: ${user.id} not found.`);
            }
            // Update user
            dbUser.firstname = user.firstname;
            dbUser.lastname = user.lastname;
            dbUser.email = user.email;
            dbUser.picture = user.picture;
            dbUser.birthday = user.birthday;
            dbUser.phone = user.phone;

            // Update address DO NOT WORK ACTUALLY
            dbUser.address[0].number = user.address[0].number;
            dbUser.address[0].street = user.address[0].street;
            dbUser.address[0].zip_code = user.address[0].zip_code;
            dbUser.address[0].city = user.address[0].city;
            dbUser.address[0].country = user.address[0].country;
            dbUser.address[0].complement = user.address[0].complement;

            console.log(dbUser.address[0]);
            console.log(user.address[0]);
            
            
            // Save user in database
            return UserRepository.save(dbUser);
        }).catch((error) => {            
            throw error;
        });

        return dbUser;
    },
    updatePassword: async (currentUserId: number, oldPassword: string, newPassword: string) => {
        // Get user from database
        let dbUser = UserRepository.findOne({
            where: {
                id: currentUserId
            }
        }).then((dbUser) => {
            // check if user exist in database
            if (!dbUser){
                throw new Api404Error(`User with id: ${currentUserId} not found.`);
            }
            
            // check if old password is correct
            let comparePassword = bcrypt.compareSync(oldPassword, dbUser.password)
            if (!comparePassword) {
                throw new Api400Error(`Old password is incorrect.`);
            }

            // Update password
            dbUser.password = bcrypt.hashSync(newPassword, 10);
            // Save user in database
            return UserRepository.save(dbUser);
        }).catch((error) => {
            console.error(error);
            throw error;
        });

        return dbUser;
    },
    deleteUser: async (currentUserId: number) => {
        // Get user from database
        let dbUser = UserRepository.findOne({
            where: {
                id: currentUserId
            }
        }).then((dbUser) => {
            // check if user exist in database
            if (!dbUser){
                throw new Api404Error(`User with id: ${currentUserId} not found.`);
            }
            // Delete user
            return UserRepository.delete(dbUser);
        }).catch((error) => {
            console.error(error);
            throw error;
        });

        return dbUser;
    }
}

module.exports = userService;