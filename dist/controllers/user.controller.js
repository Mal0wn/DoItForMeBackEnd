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
exports.userController = void 0;
const userService = require("../services/user.service");
exports.userController = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userService.findAll();
            res.json(users);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }),
    getByName: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userService.findAllByFullName(req.params.firstname, req.params.lastname);
            res.json(users);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userID = yield userService.create(req.body);
            console.log(userID);
            res.json(userID);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }),
    id: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userService.findByIdWithMissionCreated(req.params.id);
            res.json(users);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    })
};
