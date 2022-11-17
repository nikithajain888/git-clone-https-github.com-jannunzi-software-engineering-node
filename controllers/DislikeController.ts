/**
 * @file Controller RESTful Web service API for Dislikes resource
 */
 import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import DislikeDao from "../daos/DislikeDao";
 import TuitDao from "../daos/TuitDao";
 import DislikeControllerI from "../interfaces/DislikeController";
 
 /**
  * @class TuitController Implements RESTful Web service API for Dislikes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/Dislikes to retrieve all the tuits Disliked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/Dislikes to retrieve all users that Disliked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/Dislikes/:tid to record that a user Dislikes a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unDislikes/:tid to record that a user
  *     no londer Dislikes a tuit</li>
  * </ul>
  * @property {DislikeDao} DislikeDao Singleton DAO implementing Dislikes CRUD operations
  * @property {DislikeController} DislikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikeController implements DislikeControllerI {
     private static DislikeDao = DislikeDao.getInstance();
     private static tuitDao = TuitDao.getInstance();
     private static DislikeController: DislikeController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): DislikeController => {
         if (DislikeController.DislikeController === null) {
             DislikeController.DislikeController = new DislikeController();
             app.get("/api/users/:uid/dislikes", DislikeController.DislikeController.findAllTuitsDislikedByUser);
             app.get("/api/tuits/:tid/dislikes", DislikeController.DislikeController.findAllUsersThatDislikedTuit);
             app.post("/api/users/:uid/dislikes/:tid", DislikeController.DislikeController.userDislikesTuit);
             app.delete("/api/users/:uid/undislikes/:tid", DislikeController.DislikeController.userUndislikesTuit);
             app.get("/api/tuits/:tid/dislikes/count", DislikeController.DislikeController.findTuitDislikesCount);
             //app.put("/api/users/:uid/dislikes/:tid", DislikeController.DislikeController.userTogglesTuitDislikes);
             app.get("/api/users/:uid/userDisliked/:tid",DislikeController.DislikeController.findUserDislikesTuit)
         }
         return DislikeController.DislikeController;
     }
 
     private constructor() { }
     
     
     /**
     * Retrieves the count of users that Disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the Disliked tuit
     * @param {Response} res Represents response to client, including the total count
     */
      findTuitDislikesCount = (req: Request, res: Response) =>
         DislikeController.DislikeDao.findTuitDislikesCount(req.params.tid)
             .then(Dislikes => res.json(Dislikes));
     /**
      * Retrieves all users that Disliked a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the Disliked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
         DislikeController.DislikeDao.findAllUsersThatDislikeTuit(req.params.tid)
             .then(Dislikes => res.json(Dislikes));
 
     /**
      * Retrieves all tuits Disliked by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user Disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were Disliked
      */
     findAllTuitsDislikedByUser = (req: Request, res: Response) =>
         DislikeController.DislikeDao.findAllTuitsDislikedByUser(req.params.uid)
             .then(Dislikes => res.json(Dislikes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userDislikesTuit = (req: Request, res: Response) =>
         DislikeController.DislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
             .then(Dislikes => res.json(Dislikes));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unliking
      * the tuit and the tuit being unDisliked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the Dislike was successful or not
      */
      userUndislikesTuit = (req: Request, res: Response) =>
         DislikeController.DislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
 
  
 
     findUserDislikesTuit = (req:Request ,res:Response) => {
         const uid = req.params.uid;
         const tid = req.params.tid;
         // @ts-ignore
         const profile = req.session['profile'];
         const userId = uid === "me" && profile ?
             profile._id : uid;
 
         DislikeController.DislikeDao.findUserDislikesTuit(uid,tid)
         .then(Dislikes => res.json(Dislikes));
     }
 
 
 };