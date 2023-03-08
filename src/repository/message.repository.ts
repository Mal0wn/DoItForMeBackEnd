import { dataSource } from "../dataSource";
import { Message } from "../models/message.model";

export const MessageRepository = dataSource.getRepository(Message).extend({

});
