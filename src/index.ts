import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import * as dotenv from "dotenv";
/* import { createMission, findAllMissions } from './models/mission'; */
import { DataSource } from 'typeorm';
import { User } from "./models/user.model"
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

app.get("/users", async function (req: Request, res: Response) {
  const users = await dataSource.getRepository(User).find();
  res.json(users);
});
app.post("/users", async function (req: Request, res: Response) {
  const user = await dataSource.getRepository(User).create(req.body)
  const results = await dataSource.getRepository(User).save(user)
  return res.send(results)
})
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

/* export const db = mysql.createConnection({
  host: process.env.MY_SQL_DB_HOST,
  user: process.env.MY_SQL_DB_USER,
  password: process.env.MY_SQL_DB_PASSWORD,
  database: process.env.MY_SQL_DB_DATABASE,
  
});

export default db;

const app: Application = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create', (req: Request, res: Response) => {
  createMission
})

app.get('/allMissions', (req: Request, res: Response) => {
  findAllMissions
  
  res.send(req.body)
  
})



const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
}) */