/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowController";
 
 
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
             FollowController.followController = new FollowController();
             app.get("/api/users/:uid/userFollowing", FollowController.followController.findAllFollowing);
             app.get("/api/users/:uid/userFollowedBy", FollowController.followController.findAllFollowers);
             app.post("/api/users/:uid/follows/:uid", FollowController.followController.userFollowsAnotherUser);
             app.delete("/api/users/:uid/unfollows/:uid", FollowController.followController.userUnfollowsAnotherUser);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
     userFollowsAnotherUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        FollowController.followDao.userFollowsAnotherUser(req.params.uid_cur, req.params.uid)
        .then(follow => res.json(follow));
     }
     userUnfollowsAnotherUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid_cur, req.params.uid)
             .then(status => res.send(status));
     }
     findAllFollowers(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        FollowController.followDao.findAllFollowers(req.params.uid)
        .then(follow => res.json(follow));
     }
     findAllFollowing(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        FollowController.followDao.findAllFollowing(req.params.uid)
        .then(follow => res.json(follow));
     }
 };