import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

require("dotenv").config({ path: ".env" })
dotenv.config({ path: "./.env" });

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["./src/models/*.model.ts"],
    logging: true,
    synchronize: true
  });
