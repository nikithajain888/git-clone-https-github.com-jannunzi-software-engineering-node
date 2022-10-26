/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * @class BookmarkController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance</li>
 *     <li>GET //api/tuits/:tid/bookmarks to retrieve all the bookmark instances of a user</li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all tuits bookmarked by a user </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to remove a particular bookmark instance</li>
 * </ul>
 * @property {BookmarkDao} BookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */

export default class BookmarkController implements BookmarkControllerI {
   private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
   private static bookmarkController: BookmarkController | null = null;
   /**
    * Creates singleton controller instance
    * @param {Express} app Express instance to declare the RESTful Web service
    * API
    * @return BookmarkController
    */
   public static getInstance = (app: Express): BookmarkController => {
      if (BookmarkController.bookmarkController === null) {
         BookmarkController.bookmarkController = new BookmarkController();
         app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarksByUser);
         app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
         app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
         app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
      }
      return BookmarkController.bookmarkController;
   }

   private constructor() { }
   /**
    * Creates a bookmark instance in the database 
    * @param {Request} req Represents request from client, including user
    * parameter uid identifying the primary key of the user bookmarking
    * a tuit and a tuit parameter tid identifying the primary key of the
    * tuit being bookmarked
    * @param {Response} res Represents response to client, including status
    * on whether bookmarking a tuit by a user was successful or not
    * @returns a JSON body of the bookmark
    */

   userBookmarksTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
         .then(bookmarks => res.json(bookmarks));


   /**
    * Removes a bookmark instance from the database
    * @param {Request} req Represents request from client, including user
    * parameter uid identifying the primary key of the tuit to be unbookmarked
    * @param {Response} res Represents response to client, including status
    * on whether unbookmarking a tuit was successful or not
    */

   userUnBookmarksTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
         .then(status => res.send(status));

   /**
    * Finds all tuit instances that are bookmarked by a user from the database
    * @param {Request} req Represents request from the client, including
    * user parameter identifying the primary key of the user 
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the tuit objects
    * @returns JSON arrays containing the tuit objects
    */
   findAllBookmarksByUser = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.findAllBookmarksByUser(req.params.uid)
         .then(bookmarks => res.json(bookmarks));

   /**
    * Finds all user instances that have bookmarked a tuit from the database
    * @param {Request} req  Represents request from the client, including
    * tuit parameter identifying the primary key of the tuit
    * @param {Response} res Represents response to client, including the
    * body formatted as JSON arrays containing the user objects
    * @returns  JSON arrays containing the user objects
    */
   findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
         .then(bookmarks => res.json(bookmarks));

};