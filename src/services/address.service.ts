import { Api400Error, Api404Error } from "../errors/api.error";
import { Address } from "../models/address.model";
import { AddressRepository } from "../repository/address.repository";

const addressService = {

	findAll: async () => {
		return AddressRepository.find()
	},

	findByUserID: async (id: string) => {
        const idUser = parseInt(id); 
        return AddressRepository.find({
            where : { 
                id_user: idUser
            }
        });
    },
    findByMissionID: async (id: string) => {
        const idMission = parseInt(id); 
        return AddressRepository.find({
            where : { 
                id_mission: idMission
            }
        });
    },
	create : async (address : Address) => {
		return AddressRepository.save(address);
	},
    update : async (address : Address) => {  // save fait les 2 donc bon ..
		return AddressRepository.save(address);
	},
    delete : async ( id: string) => {
        const idAddress = parseInt(id);
        return AddressRepository.delete(idAddress);
    }


}

module.exports = addressService;
