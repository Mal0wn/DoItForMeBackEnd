import { Api400Error, Api404Error } from "../errors/api.error";
import { Address } from "../models/address.model";
import { AddressRepository } from "../repository/address.repository";

const addressService = {

    findByID: async (id: string) => {
        const idAddress = parseInt(id);
        if (isNaN(idAddress)){
            throw new Api400Error(`invalid Mission id: ${id}`);
        }
        const address = await AddressRepository.find({
            where : {
                id: idAddress
            }
        });
        if( address.length < 1){
            throw new Api404Error(`No Address Found`);
        }
        return address;
    },
	findByUserID: async (id: string) => {
        const idUser = parseInt(id);
        if (isNaN(idUser)){
            throw new Api400Error(`invalid User id: ${id}`);
        }
        const address = await AddressRepository.find({
            where : { 
                id_user: idUser
            }
        });
        if( address.length < 1){
            throw new Api404Error(`No Address Found`);
        }
        return address;
    },
    findByMissionID: async (id: string) => {
        const idMission = parseInt(id); 
        if (isNaN(idMission)){
            throw new Api400Error(`invalid Mission id: ${id}`);
        }
        const address = await AddressRepository.find({
            where : { 
                id_mission: idMission
            }
        });
        if( address.length < 1){
            throw new Api404Error(`No Address Found`);
        }
        return address;
    },
	create : async (address : Address) => {
        address.id = 0;
		const tmp = await AddressRepository.save(address);
        return tmp.id;
	},
    update : async (address : Address) => {
        return await AddressRepository.save(address);
	},
    delete : async ( id: string) => {
        const idAddress = parseInt(id);
        if (isNaN(idAddress)){
            throw new Api400Error(`Invalid Address id: ${id}`);
        }
        const status = await AddressRepository.delete(idAddress);
        if( status.affected === 0){
            throw new Api404Error(`Delete failed, No entry for id: ${id}`);
        }
		return;
    }
}

module.exports = addressService;
