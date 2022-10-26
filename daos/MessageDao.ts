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
      
    /**
      * Inserts message instance into the database
      * @param {Message} message Instance to be inserted into the database by a
      * @returns Promise To be notified when message is inserted into the database
      */
      send = async (message: Message): Promise<Message> =>
          MessageModel.create({...message});
      
    /**
   * Removes message from the database.
   * @param {string} mid Primary key of message to be removed
   * @returns Promise To be notified when message is removed from the database
   */
      unsend=async(mid: string): Promise<any> =>
          MessageModel.deleteOne({_id:mid})
      
    /**
     * Uses MessageModel to retrieve all sent message documents from 
     * messages collection
     * @param sender_id 
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */

      findMessagesSent = async(sender_id: string): Promise<Message[]> =>
          MessageModel
          .find({sender:sender_id})
          .populate("message")
          .exec();

    /**
     * Uses MessageModel to retrieve all receieved message documents from 
     * messages collection
     * @param receiver_id 
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
      
      findMessagesReceived = async(receiver_id: string): Promise<Message[]> =>
        MessageModel
        .find({receiver:receiver_id})
        .populate("message")
        .exec();


        private static messagesDao:MessageDao|null=null;
        /**
         * Creates a singleton DAO instance
         * @returns MessageDao
         */
        public static getInstance=():MessageDao=>{
            if(MessageDao.messagesDao===null){
                MessageDao.messagesDao = new MessageDao();
            }
            return MessageDao.messagesDao;
        }
  }