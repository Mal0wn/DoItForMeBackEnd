import * as bodyParser from "body-parser";
import * as express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";

import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
const config = require ( "../tsconfig.json" );

import { dataSource } from "./dataSource";
const indexRouter = require("./routes/index.route");

import { MissionService } from "./services/mission.service";
import { MissionController } from "./controllers/mission.controller";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";



dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });


// set up container
const container = new Container ();


// note that you *must* bind your controllers to Controller
//Mission
container
    .bind<MissionService>(MissionService.name)
    .to(MissionService)
    .inSingletonScope();
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(MissionController)
    .whenTargetNamed(MissionController.name);
//User
container
    .bind<UserService>(UserService.name)
    .to(UserService)
    .inSingletonScope();
container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(UserController)
    .whenTargetNamed(UserController.name);



// create server
const server = new InversifyExpressServer ( container );

server.setConfig( ( app : any ) => {
    app.use( '/api-docs/swagger' , express.static( 'swagger' ) );
    app.use( '/api-docs/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
    app.use( bodyParser.json() );
    app.use( swagger.express(
        {
            definition : {
                info : {
                    title : "DO IT 4 ME - API" ,
                    version : "1.0"
                } ,
                externalDocs : {
                    url : "My url"
                }
                // Models can be defined here
            }
        }
    ) );
} );

server.setErrorConfig( ( app : any ) => {
    app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
        console.error( err.stack );
        response.status( 500 ).send( "Something broke!" );
    } );
} );

const app = server.build();

const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

















/*
const app: Application = express();
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
 





*/
