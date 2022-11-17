import { Api400Error, Api404Error } from "../errors/api.error";
import { User } from "../models/user.model";
import { UserRepository } from "../repository/user.repository";
import 'reflect-metadata';
import { injectable } from 'inversify';
import * as _ from 'lodash';

// https://typeorm.io/find-options

@injectable()
export class UserService {

	private userList : User[]

	public async getUsers(): Promise<User[]> {
		
		this.userList = await UserRepository.find()
		return this.userList
		
	}

	public async findById(id: any){
        
        return UserRepository.find({
            where: {
                id: id 
            }
        });
    }

	public createUser(user: User){
		return UserRepository.create(user);
	}

   public async findByIdWithMissionCreated(id: any){
        return UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionMade: {
                    title: true
                }
            }
        });
    }

    public async findByIdWithMissionMadeTitle(id: any){
        return UserRepository.find({
            where: {
                id: id
            },
            relations: {
                missionMade: {
                    title: true
                }
            }
        });
    }

    public async findAllByFullName(firstName: string, lastName: string){
        if (firstName === ""){
            throw new Api400Error(`firstName empty.`);
        }else if(lastName === ""){
            throw new Api400Error(`lastName empty.`);
        }
        const users = await UserRepository.find({
            where: {
                firstname: firstName,
                lastname: lastName
            }
        });
        if( users.length === 0){
            throw new Api404Error(`User with firstName: ${firstName} and lastName: ${lastName} not found.`);
        }
        return users;
    }
    
}
