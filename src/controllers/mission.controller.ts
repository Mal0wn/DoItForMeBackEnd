import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import {
    interfaces,
    controller,
    httpGet,
	httpPost,
    requestParam,
} from 'inversify-express-utils';
import {
    ApiPath,
    SwaggerDefinitionConstant,
    ApiOperationGet,
	ApiOperationPost
} from 'swagger-express-ts';
import * as express from 'express';
import { MissionService } from "../services/mission.service";
import { Mission } from '../models/mission.model';

@ApiPath({
    name: 'Missions',
    path: '/mission',
    security: { apiKeyHeader: [] },
})

@controller('/mission')
@injectable()


export class MissionController implements interfaces.Controller {
    constructor(@inject(MissionService.name) private MissionService: MissionService) {}
	// Get All Missions 
    @ApiOperationGet({
        description: 'Find all Missions',
        responses: {
            200: {
                model: 'Mission',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
        },
        security: {
            apiKeyHeader: [],
        },
        summary: 'Get Missions list',
    })

    @httpGet('/')
    public getMissions(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.MissionService.getMissions());
    }

	// Post a mission
    @ApiOperationPost({
        description: 'Add a new mission',
        parameters: {
            body: {
                description: 'New mission',
                model: 'mission',
                required: true,
            },
        },
        responses: {
            200: {
                model: 'Mission',
            },
            400: { description: 'Parameters fail' },
        },
        summary: 'Post new mission',
    })

    @httpPost('/')
    public postMission(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
           response.status(400).end();
        }
        const newMission = new Mission();
        newMission.title = request.body.title;
        newMission.description = request.body.description;
        this.MissionService.createMission(request.body);
        response.json(request.body);
    }

	// Get One Mission 
	@ApiOperationGet({
        description: 'Find mission with the id',
        parameters: {
            path: {
                id: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                },
            },
        },
        responses: {
            200: {
                model: 'Mission',
            },
            400: {description: 'Parameters fail'},
        },
    })
    @httpGet('/')
    public getMissionById(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.MissionService.findById(id));
    }


}
