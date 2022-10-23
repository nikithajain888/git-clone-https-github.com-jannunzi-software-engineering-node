 /**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
  import MessageModel from "../mongoose/MessageModel";
  import MessageDaoI from "../interfaces/MessageDao";
  import Message from "../models/Message";
 
  /**
  * @class MessagesDao Implements Data Access Object managing data storage
  * of messages
  * @property {MessageDao} messagesDao Private single instance of MessagesDao
  */
  export default class MessageDao implements MessageDaoI{
      
      send = async (message: Message): Promise<Message> =>
          MessageModel.create({...message});
      
      unsend=async(mid: string): Promise<any> =>
          MessageModel.deleteOne({_id:mid})
      
      findMessagesSent = async(sender_id: string): Promise<Message[]> =>
          MessageModel
          .find({sender:sender_id})
          .populate("message")
          .exec();
      
      findMessagesReceived = async(receiver_id: string): Promise<Message[]> =>
        MessageModel
        .find({receiver:receiver_id})
        .populate("message")
        .exec();


        private static messagesDao:MessageDao|null=null;
        public static getInstance=():MessageDao=>{
            if(MessageDao.messagesDao===null){
                MessageDao.messagesDao = new MessageDao();
            }
            return MessageDao.messagesDao;
        }
  }