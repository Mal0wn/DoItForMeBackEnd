import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "8000"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["./src/models/*.model.ts"],
    logging: true,
    synchronize: true
  });