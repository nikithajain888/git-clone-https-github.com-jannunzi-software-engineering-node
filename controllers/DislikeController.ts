/**
 * @file Controller RESTful Web service API for Dislikes resource
 */
import { Express, Request, Response } from "express";
import DislikeDao from "../daos/DislikeDao";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import DislikeControllerI from "../interfaces/DislikeController";
import TuitSchema from "../mongoose/TuitSchema";

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
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): DislikeController => {
        if (DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsDislikedByUser);
            app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatDislikedTuit);
            app.post("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userDislikesTuit);
            app.delete("/api/users/:uid/undislikes/:tid", DislikeController.dislikeController.userUndislikesTuit);
            app.get("/api/tuits/:tid/dislikes/count", DislikeController.dislikeController.findTuitDislikesCount);
            app.get("/api/users/:uid/userDisliked/:tid", DislikeController.dislikeController.findUserDislikesTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitDislikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() { }
    /**
    * Retrieves the count of users that Disliked a tuit from the database
    * @param {Request} req Represents request from client, including the path
    * parameter tid representing the Disliked tuit
    * @param {Response} res Represents response to client, including the total count
    */
    findTuitDislikesCount = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findTuitDislikesCount(req.params.tid)
            .then(dislikes => res.json(dislikes));
    /**
     * Retrieves all users that Disliked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the Disliked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatDislikedTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllUsersThatDislikeTuit(req.params.tid)
            .then(dislikes => res.json(dislikes));

    /**
     * Retrieves all tuits Disliked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user Disliked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were Disliked
     */
    findAllTuitsDislikedByUser = (req: Request, res: Response) =>
        DislikeController.dislikeDao.findAllTuitsDislikedByUser(req.params.uid)
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
        DislikeController.dislikeDao.userDislikesTuit(req.params.uid, req.params.tid)
            .then(Dislikes => res.json(Dislikes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unDisliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the Dislike was successful or not
     */
    userUndislikesTuit = (req: Request, res: Response) =>
        DislikeController.dislikeDao.userUndislikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

      /**
     * Find if a user has disliked a tuit or not
     * @param req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
       findUserDislikesTuit = (req:Request ,res:Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

        DislikeController.dislikeDao.findUserDislikesTuit(uid,tid)
                .then(dislikes => res.json(dislikes));

    }
    userTogglesTuitDislikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyDislikedTuit = await DislikeController.dislikeDao
                .findUserDislikesTuit(uid, tid);
            const userAlreadyLikedTuit = await DislikeController.likeDao
                .findUserLikesTuit(uid, tid);
            const howManyLikedTuit = await DislikeController.likeDao
                .findTuitLikesCount(tid);
            const howManyDislikedTuit = await DislikeController.dislikeDao
                .findTuitDislikesCount(tid);
            let tuit = await DislikeController.tuitDao.findTuitById(tid);
            if (userAlreadyDislikedTuit && howManyDislikedTuit>0) {
                    await DislikeController.dislikeDao.userUndislikesTuit(uid, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;;
            } else {
                if(howManyLikedTuit>0){
                    await DislikeController.likeDao.userUnlikesTuit(uid, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                    await DislikeController.tuitDao.updateLikes(tid, tuit.stats);
                }
                await DislikeController.dislikeDao.userDislikesTuit(uid, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
            };
            
            await DislikeController.tuitDao.updateDislikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};