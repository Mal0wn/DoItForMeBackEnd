"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const indexRouter = require("./routes/index.route");
require("dotenv").config({ path: ".env" });
dotenv.config({ path: "./.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
const dataSource = new typeorm_1.DataSource({
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
dataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
app.use("/", indexRouter);
/*
// Methods for Users
app.get("/users", async function (req: Request, res: Response) {
const users = await dataSource.getRepository(User).find();
res.json(users);
});
app.post("/users", async function (req: Request, res: Response) {
const user = await dataSource.getRepository(User).create(req.body)
const results = await dataSource.getRepository(User).save(user)
return res.send(results)
})


//Methods for Missions
app.get("/missions", async function (req: Request, res: Response) {
const missions = await dataSource.getRepository(Mission).find();
res.json(missions);
});
app.post("/mission", async function (req: Request, res: Response) {
const mission = await dataSource.getRepository(Mission).create(req.body)
const results = await dataSource.getRepository(Mission).save(mission)
return res.send(results)
})
*/
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
