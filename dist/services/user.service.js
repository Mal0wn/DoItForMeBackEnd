"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api.error");
const user_repository_1 = require("../repository/user.repository");
// https://typeorm.io/find-options
exports.userService = {
    findAllByFullName: (firstName, lastName) => __awaiter(void 0, void 0, void 0, function* () {
        if (firstName === "") {
            throw new api_error_1.Api400Error(`firstName empty.`);
        }
        else if (lastName === "") {
            throw new api_error_1.Api400Error(`lastName empty.`);
        }
        const users = yield user_repository_1.UserRepository.find({
            where: {
                firstname: firstName,
                lastname: lastName
            }
        });
        if (users === null) {
            throw new api_error_1.Api404Error(`User with firstName: ${firstName} and lastName: ${lastName} not found.`);
        }
        return users;
    }),
    findAllByFullName2: (firstname, lastname) => __awaiter(void 0, void 0, void 0, function* () {
        return user_repository_1.UserRepository.findAllByName(firstname, lastname);
    }),
    findAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return user_repository_1.UserRepository.find();
    }),
    findByIdWithMissionCreated: (userID) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(userID);
        return user_repository_1.UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionCreated: true
            }
        });
    }),
    findByIdWithMissionMadeTitle: (userID) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(userID);
        return user_repository_1.UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionMade: {
                    title: true
                }
            }
        });
    }),
    create: (user) => __awaiter(void 0, void 0, void 0, function* () {
        return user_repository_1.UserRepository.create(user).id; // return only id
    })
};
