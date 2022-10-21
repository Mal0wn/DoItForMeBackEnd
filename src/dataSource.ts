import { DataSource } from "typeorm";

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST ?? "localhost",
    port: parseInt(process.env.DB_PORT ?? "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["./src/models/*.model.ts"],
    logging: true,
    synchronize: true
  });

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });


module.exports = dataSource;