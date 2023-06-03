import express, { Application } from 'express';
import expressWs from 'express-ws';
import { dataSource } from "./dataSource";
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
import userRouter from './routes/user.route';
import missionRouter from './routes/mission.route';
import authenticationRouter from './routes/authentication.route';
import { securityJWTMiddleware } from './middleware/token.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import * as dotenv from "dotenv";
import { wsMiddleware } from './middleware/ws.middleware';
import messageRouter from './routes/message.route';
import addressRouter from './routes/address.route';

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  });

//Initialization App to support websocket
var appWs = expressWs(express());  // appWs.getWss().clients to find all users connected
const app = appWs.app;
app.locals.notifications = [];

const swaggerDocument = YAML.load('./swagger.yaml');
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

//CORS
app.use(cors());

//Routers Redirection
app.use("/login", authenticationRouter);
// Using the securityJWTMiddleware middleware to check if the user is authenticated before accessingthe missionRouter. 
app.use(`/user`, securityJWTMiddleware, userRouter);
app.use(`/mission`, securityJWTMiddleware, missionRouter);
app.use(`/message`, securityJWTMiddleware, messageRouter);
app.use(`/address`, securityJWTMiddleware, addressRouter);

// error handling , must be .use as last
app.use(errorMiddleware);
// websocket route ( not HTTP method)
app.ws(`/ws`, wsMiddleware);

//Port App Management

require("dotenv").config({ path: ".env" })
dotenv.config({ path: process.env.NODE_ENV === 'prod' ? './prod.env' : './dev.env' });
const PORT = process.env.APP_PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});