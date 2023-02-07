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
    findUserById: async (userId: number) => {
        return UserRepository.findOne({
            where: {
                id: userId
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
    create: async (user: User) => {
        return UserRepository.save(user);// return only id
    },
    update: async (user: User) => {
        // Get user from database
        let dbUser = UserRepository.findOne({
            where: {
                id: user.id
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
            // Save user in database
            return UserRepository.save(dbUser);
        }).catch((error) => {
            console.error(error);
            
            throw error;
        });

        return dbUser;
    }
}

module.exports = userService;