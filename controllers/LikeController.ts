/**
 * @file Controller RESTful Web service API for likes resource
 */
import { Express, Request, Response } from "express";
import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";
import TuitDao from "../daos/TuitDao";
import LikeControllerI from "../interfaces/LikeController";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();
    private static likeController: LikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): LikeController => {
        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
            app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.get("/api/tuits/:tid/likes/count", LikeController.likeController.findTuitLikesCount);
            app.get("/api/users/:uid/userLiked/:tid", LikeController.likeController.findUserLikesTuit);
            app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
        }
        return LikeController.likeController;
    }

    private constructor() { }
    /**
    * Retrieves the count of users that liked a tuit from the database
    * @param {Request} req Represents request from client, including the path
    * parameter tid representing the liked tuit
    * @param {Response} res Represents response to client, including the total count
    */
    findTuitLikesCount = (req: Request, res: Response) =>
        LikeController.likeDao.findTuitLikesCount(req.params.tid)
            .then(likes => res.json(likes));
    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */

    findAllTuitsLikedByUser = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const profile = req.session['profile'];
         //@ts-ignore
        const userId = uid === "me" && profile ?
            profile._id : uid;
 //@ts-ignore
        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(likes => {
                const likesNonNullTuits =
                    likes.filter(like => like.tuit);
                const tuitsFromLikes =
                    likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
            
    }



    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

     /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking
     * the tuit and the tuit being liked
     * @param {Response} res Represents response to client, including a
     * user object that liked a tuit
     */

    findUserLikesTuit = (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
        //@ts-ignore
        const userId = uid === "me" && profile ? 
            profile._id : uid;
         //@ts-ignore
        LikeController.likeDao.findUserLikesTuit(userId, tid)
            .then(likes => res.json(likes));

    }

      /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is toogling
     * like button on a tuit
     * @param {Response} res Represents response to client, including status
     * on whether deleting the toggling like was successful or not
     */


    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        const profile = req.session['profile'];
         // @ts-ignore
        const userId = uid === "me" && profile ?
         //@ts-ignore
         profile._id : userId;
        try {
            const userAlreadyDislikedTuit = await LikeController.dislikeDao
                .findUserDislikesTuit(userId, tid);
            const userAlreadyLikedTuit = await LikeController.likeDao
             //@ts-ignore
                .findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await LikeController.likeDao
                .findTuitLikesCount(tid);
            const howManyDislikedTuit = await LikeController.dislikeDao
                .findTuitDislikesCount(tid);
            let tuit = await LikeController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit.length==1 && howManyLikedTuit>0) {
                 //@ts-ignore
                await LikeController.likeDao.userUnlikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            } else {
                if (howManyDislikedTuit > 0) {
                     //@ts-ignore
                    await LikeController.dislikeDao.userUndislikesTuit(userId, tid);
                    tuit.stats.dislikes = howManyDislikedTuit - 1;
                    await LikeController.tuitDao.updateDislikes(tid, tuit.stats);
                }
                 //@ts-ignore
                await LikeController.likeDao.userLikesTuit(userId, tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };

            await LikeController.tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    };
}
