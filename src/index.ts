import express, { Application, Request, Response } from 'express';
import { dataSource } from "./dataSource";
const indexRouter = require("./routes/index.route");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
// import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';
import { User } from "./models/user.model"
import { Mission } from "./models/mission.model"

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });

const app: Application = express();

const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(indexRouter);





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
