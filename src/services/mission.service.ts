import { Api400Error, Api404Error } from "../errors/api.error";
import { Mission } from "../models/mission.model";
import { MissionRepository } from "../repository/mission.repository";
import 'reflect-metadata';
import { injectable } from 'inversify';
import * as _ from 'lodash';



@injectable()
export class MissionService {

	private missionList : Mission[]

	public async getMissions(): Promise<Mission[]> {
		
		this.missionList = await MissionRepository.find()
		return this.missionList
		
	}

	public async findById(id: any){
        
        return MissionRepository.find({
            where: {
                id: id 
            }
        });
    }

	public createMission(mission: Mission){
		return MissionRepository.createMission(mission);
	}

    
}
