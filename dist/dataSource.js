"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: (_a = process.env.HOST) !== null && _a !== void 0 ? _a : "localhost",
    port: parseInt((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["./src/models/*.model.ts"],
    logging: true,
    synchronize: true
});
