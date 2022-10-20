import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import * as dotenv from "dotenv";
import { createMission, findAllMissions } from './models/mission';
dotenv.config();

export const db = mysql.createConnection({
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
})