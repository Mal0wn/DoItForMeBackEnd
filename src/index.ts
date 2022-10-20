import express, { Application, Request, Response } from 'express';
import * as dotenv from "dotenv";
import { DataSource } from 'typeorm';
import { User } from "./models/user.model"
import { Mission } from "./models/mission.model"


require("dotenv").config({ path: ".env" })
dotenv.config({ path: "./.env" });

const app: Application = express();
app.use(express.json());
const dataSource = new DataSource({
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
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    //console.log("path entities is : "+ JSON.stringify(dataSource.entityMetadatas))
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });


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


const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

