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
import { UserService } from"../services/user.service";
import { User } from "../models/user.model";


@ApiPath({
    name: 'Users',
    path: '/user',
    security: { apiKeyHeader: [] },
})

@controller('/user')
@injectable()

export class UserController implements interfaces.Controller {
    constructor(@inject(UserService.name) private UserService: UserService) {}
	// Get All users 
    @ApiOperationGet({
        description: 'Find all Users',
        responses: {
            200: {
                model: 'User',
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
        },
        security: {
            apiKeyHeader: [],
        },
        summary: 'Get Users list',
    })

    @httpGet('/')
    public getUsers(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.UserService.getUsers());
    }

	// Create a User
    @ApiOperationPost({
        description: 'Create User',
        parameters: {
            body: {
                description: 'New user',
                model: 'User',
                required: true,
            },
        },
        responses: {
            200: {
                model: 'User',
            },
            400: { description: 'Parameters fail' },
        },
        summary: 'create a new user',
    })

    @httpPost('/')
    public postUser(
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        if (!request.body) {
           response.status(400).end();
        }
        const newUser = new User();
        newUser.firstname = request.body.title;
        newUser.lastname = request.body.lastname;
        this.UserService.createUser(request.body);
        response.json(request.body);
    }

	// Get One User with ID 
	@ApiOperationGet({
        description: 'Find user with the id',
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
                model: 'User',
            },
            400: {description: 'Parameters fail'},
        },
    })
    @httpGet('/')
    public getUserById(
        @requestParam('id') id: string,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.UserService.findById(id));
    }

    // Get One User with full name 
	@ApiOperationGet({
        description: 'Find user with the id',
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
                model: 'User',
            },
            400: {description: 'Parameters fail'},
        },
    })
    @httpGet('/')
    public getUserByName(
        @requestParam('firstname') firstname: string,
        @requestParam('lastname') lastname : string ,
        request: express.Request,
        response: express.Response,
        next: express.NextFunction
    ): void {
        response.json(this.UserService.findAllByFullName(firstname , lastname));
    }


}
