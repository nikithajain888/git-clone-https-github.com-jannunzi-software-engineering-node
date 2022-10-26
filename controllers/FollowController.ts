/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/follows/:uid to create a new follow instance</li>
 *     <li>GET /api/users/:uid/userFollowing to retrieve all the following instances of a user</li>
 *     <li>GET /api/users/:uid/userFollowedBy to retrieve all the follower instance of a user </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid to remove a particular follow instance</li>
 * </ul>
 * @property {FollowDao} FollowDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.get("/api/users/:uid/userFollowing", FollowController.followController.findAllFollowing);
      app.get("/api/users/:uid/userFollowedBy", FollowController.followController.findAllFollowers);
      app.post("/api/users/:uid/follows/:uid", FollowController.followController.userFollowsAnotherUser);
      app.delete("/api/users/:uid/unfollows/:uid", FollowController.followController.userUnfollowsAnotherUser);
    }
    return FollowController.followController;
  }

  private constructor() { }

  /**
   * Creates a follow instance from user to another in the database.
   * @param req Represents request from client, including user
   * parameter uid_cur identifying the primary key of the user
   * following another user parameter uid identifying the primary key
   * @param res Represents response to client, including a
   * JSON body object of a follow instance
   * @returns JSON body object of a follow instance
   */

  userFollowsAnotherUser = (req: Request, res: Response) =>
    FollowController.followDao.userFollowsAnotherUser(req.params.uid_cur, req.params.uid)
      .then(follow => res.json(follow));


  /**
   * Removes a follow instance form user to another in the database
   * @param req Represents request from client, including user
   * parameter uid_cur identifying the primary key of the user
   * unfollowing another user parameter uid identifying the primary
   * key
   * @param res Represents response to client, including status
   * on whether unfollowing a user was successful or not
   * @returns status on whether unfollowing a user was successful
   *  or not
   */
  userUnfollowsAnotherUser = (req: Request, res: Response) =>
    FollowController.followDao.userUnfollowsAnotherUser(req.params.uid_cur, req.params.uid)
      .then(status => res.send(status));


  /**
   * Finds all user follower instances of another user in 
   * the database
   * @param req Represents request from client, including user
   * parameter uid identifying the primary key of the user
   * @param res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   * that follower the user uid
   * @returns JSON arrays containing the user objects
   * that follower the user uid
   */
  findAllFollowers = (req: Request, res: Response) =>
    FollowController.followDao.findAllFollowers(req.params.uid)
      .then(follow => res.json(follow));


  /**
   * Finds all user following instances of another user in 
   * the database
   * @param req Represents request from client, including user
   * parameter uid identifying the primary key of the user
   * @param res Represents response to client, including the
   * body formatted as JSON arrays containing the user objects
   * that following the user uid
   * @returns JSON arrays containing the user objects
   * that following the user uid
   */
  findAllFollowing = (req: Request, res: Response) =>
    FollowController.followDao.findAllFollowing(req.params.uid)
      .then(follow => res.json(follow));

};