/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkController";
 
 
 export default class BookmarkController implements BookmarkControllerI {
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): BookmarkController => {
         if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
             app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllBookmarksByUser);
             app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
             app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
             app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnBookmarksTuit);
         }
         return BookmarkController.bookmarkController;
     }
 
     private constructor() {}
     userBookmarksTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
        .then(bookmarks => res.json(bookmarks));
     }
     userUnBookmarksTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
     }
     findAllBookmarksByUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        BookmarkController.bookmarkDao.findAllBookmarksByUser(req.params.uid)
        .then(bookmarks => res.json(bookmarks));
     }
     findAllUsersThatBookmarkedTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
        .then(bookmarks => res.json(bookmarks));
     }
 };