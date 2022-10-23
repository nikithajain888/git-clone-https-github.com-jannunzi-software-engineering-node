/**
 * @file Controller RESTful Web service API for message resource
 */
 import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import MessageDao from "../daos/MessageDao";
 import MessageControllerI from "../interfaces/MessageController";
import Message from "../models/Message";
 
 
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
             app.get("/api/users/:uid/receiverMessages", MessageController.messageController.findMessagesReceived);
             app.post("/api/users/:senderuid/sendMessage/users/:receieveruid", MessageController.messageController.send);
             app.delete("/api/users/:uid/unSendMessage/:mid", MessageController.messageController.unsend);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}

     send = (req: Request, res: Response) =>
     MessageController.messageDao.send(req.body)
         .then((message: Message) => res.json(message));
     unsend= (req: Request, res: Response) =>
     MessageController.messageDao.unsend(req.params.mid)
         .then((status) => res.send(status));
     findMessagesSent= (req: Request, res: Response) =>
     MessageController.messageDao.findMessagesSent(req.params.uid)
         .then((message: Message[]) => res.json(message));
     findMessagesReceived= (req: Request, res: Response) =>
     MessageController.messageDao.findMessagesReceived(req.params.uid)
         .then((message: Message[]) => res.json(message));
 };