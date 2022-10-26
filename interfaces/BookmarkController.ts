/**
 * @file Bookmark Controller Interface RESTful Web service API for bookmarks instance
 */
import {Request, Response} from "express";
/**
 * @interface BookmarkController An interface for Bookmarks on Tuiter.
 *
 */
export default interface FollowControllerI {
    /**
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user whos bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmarks that was inserted in the
     * database
     */
    userBookmarksTuit(req: Request, res: Response): void;
    /**
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */

    userUnBookmarksTuit(req: Request, res: Response): void;
    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
    findAllBookmarksByUser(req: Request, res: Response): void;
    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user bookmarked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that
     * bookmarked a tuit
     */
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
};