/**
 * @file Controller RESTful Web service API for message resource
 */
 import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageController";
import Message from "../models/Message";
 
 /**
  * @class MessageController Implements RESTful Web service API for users resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:senderuid/sendMessage/users/:receieveruid to create a new message instance</li>
  *     <li>GET /api/users/:uid/sentMessages to retrieve all the sent message instances of a user</li>
  *     <li>GET receivedMessages to retrieve all received messages by a user </li>
  *     <li>DELETE /api/users/:uid/unSendMessage/:mid to delete a particular message instance</li>
  * </ul>
  * @property {MessageDao} BookmarkDao Singleton DAO implementing bookmark CRUD operations
  * @property {MessageController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/sentMessages", MessageController.messageController.findMessagesSent);
             app.get("/api/users/:uid/receivedMessages", MessageController.messageController.findMessagesReceived);
             app.post("/api/users/:senderuid/sendMessage/users/:receieveruid", MessageController.messageController.send);
             app.delete("/api/users/:uid/unSendMessage/:mid", MessageController.messageController.unsend);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}

      /**
      * Creates a message instance from the database
      * @param {Request} req Represents request from client, including message
      * parameter body identifying the contents of the message to be created
      * @param {Response} res Represents response to client, including a
      * JSON object of a message instance
      * @returns status on whether creating a message was successful or not
      */

     send = (req: Request, res: Response) =>
     MessageController.messageDao.send(req.body)
         .then((message: Message) => res.json(message));

     /**
      * Removes a message instance from the database
      * @param {Request} req Represents request from client, including message
      * parameter uid identifying the primary key of the message to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a message was successful or not
      * @returns status on whether deleting a message was successful or not
      */

     unsend= (req: Request, res: Response) =>
     MessageController.messageDao.unsend(req.params.mid)
         .then((status) => res.send(status));

    /**
     * Finds all message instances sent by a user from the database
     * @param {Request} req Represents request from client, including user
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     * @returns JSON arrays containing the sent message objects
     */

     findMessagesSent= (req: Request, res: Response) =>
     MessageController.messageDao.findMessagesSent(req.params.uid)
         .then((message: Message[]) => res.json(message));

    /**
     * Finds all message instances receieved by a user from the database
     * @param {Request} req Represents request from client, including user
     * parameter uid identifying the primary key of the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     * @returns JSON arrays containing the receieved message objects
     */

     findMessagesReceived= (req: Request, res: Response) =>
     MessageController.messageDao.findMessagesReceived(req.params.uid)
         .then((message: Message[]) => res.json(message));
 };