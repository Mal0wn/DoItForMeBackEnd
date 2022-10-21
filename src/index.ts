import express, { Application, Request, Response } from 'express';
import { dataSource } from "./dataSource";
const indexRouter = require("./routes/index.route");

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });

const app: Application = express();
app.use(express.json());
app.use(indexRouter);

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
