import { Api400Error, Api404Error } from "../errors/api.error";
import { Address } from "../models/address.model";
import { AddressRepository } from "../repository/address.repository";

const addressService = {

	findAll: async () => {
		return AddressRepository.find()
	},

	findByUserID: async (id: string) => {
        const idUser = parseInt(id);
        if (!isNaN(idUser)){
            throw new Api400Error(`invalid Mission id ( = \'${id}\')`);
        }
        return AddressRepository.find({
            where : { 
                id_user: idUser
            }
        });
    },
    findByMissionID: async (id: string) => {
        const idMission = parseInt(id); 
        if (!isNaN(idMission)){
            throw new Api400Error(`invalid Mission id ( = \'${id}\')`);
        }
        return AddressRepository.find({
            where : { 
                id_mission: idMission
            }
        });
    },
	create : async (address : Address) => {
		return AddressRepository.save(address);
	},
    update : async (address : Address) => {
        const res = await AddressRepository.save(address);
        if (res.id != address.id){
            await AddressRepository.delete(res.id);
            throw new Api400Error(`No existing Address for this id ( = \'${address.id}\')`);
        }
        return res;
	},
    delete : async ( id: string) => {
        const idAddress = parseInt(id);
        if (!isNaN(idAddress)){
            throw new Api400Error(`invalid Address id ( = \'${id}\')`);
        }
        return AddressRepository.delete(idAddress);
    }
}

module.exports = addressService;
