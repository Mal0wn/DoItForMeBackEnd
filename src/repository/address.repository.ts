import { dataSource } from "../dataSource";
import { Address } from "../models/address.model";

export const AddressRepository = dataSource.getRepository(Address).extend({

});
