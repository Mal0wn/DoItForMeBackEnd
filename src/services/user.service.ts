import { UserRepository } from "../repository/user.repository";

// https://typeorm.io/find-options
export const userService = {

    findAllByFullName: async (firstName: string, lastName: string) => {
        return await UserRepository.find({
            where: {
                firstname: firstName,
                lastname: lastName
            }
        });
    },

    findAllByFullName2: async (firstname: string, lastname: string) => {
        return UserRepository.findAllByName(firstname, lastname);
    },// en fait ca fait la meme chose qu'au dessus mais ca utilise notre fonction custom

    findAll: async () => {
        return UserRepository.find();
    },

    findByIdWithMissionCreated: async (userID: number) => {
        return UserRepository.find({
            where: {
                id: userID
            },
            relations: {
                missionCreated: true
            }
        });
    },

    findByIdWithMissionMadeTitle: async (userID: number) => {
        return UserRepository.find({
            where: {
                id: userID
            },
            relations: {
                missionMade: {
                    title: true
                }
            }
        });
    }
}