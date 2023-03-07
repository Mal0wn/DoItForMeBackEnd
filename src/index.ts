import express, { Application } from 'express';
import { dataSource } from "./dataSource";
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
import userRouter from './routes/user.route';
import missionRouter from './routes/mission.route';
import authenticationRouter from './routes/authentication.route';
import { securityJWTMiddleware } from './middleware/token.middleware';
import { errorMiddleware } from './middleware/error.middleware';

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });

//Initialization App
const app: Application = express();

const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
//Routers Redirection
app.use("/login", authenticationRouter);
app.use(`/user`, securityJWTMiddleware, userRouter);
/* Using the securityJWTMiddleware middleware to check if the user is authenticated before accessing
the missionRouter. */
app.use(`/mission`, securityJWTMiddleware, missionRouter);
app.use(errorMiddleware);
//Port App Management
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
