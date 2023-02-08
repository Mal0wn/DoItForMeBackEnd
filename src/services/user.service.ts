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
    findUserById: async (userId: number) => {
        return UserRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                address: true
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
                missionMade: true
            }
        });
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