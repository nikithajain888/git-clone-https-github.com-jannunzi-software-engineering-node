/**
 * @file Bookmark DAO Interface for RESTful Web service API bookmarks instance
 */
import Bookmark from "../models/Bookmark";
import User from "../models/User";
/**
 * @interface BookmarkDao An interface for data access objects of Bookmark on Tuiter.

 */
export default interface BookmarkDaoI {
    /**
     * Uses BookmarkModel to create a new Bookmark for a user on specific tuit.
     * @param {string} uid User id who wants to bookmark a tuit
     * @param {string} tid Tuit id of tuit to be bookmarked
     * @returns Promise To be notified when a bookmark is added to
     * database
     */
    userBookmarksTuit(uid:String, tid:string):Promise<any>;
    /**
     * Uses BookmarksModel to remove a Bookmark for tuit.
     * @param {string} uid User id of user who unbookmarks the tuit
     * @param {string} tid Tuit id of tuit to be unbookmark
     * @returns Promise To be notified when the bookmarks are removed from
     * database
     */
    userUnBookmarksTuit(uid_cur:String, tid:string):Promise<any>;
    /**
     * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
     * @param {string} uid User id for which bookmarks are to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarksByUser(uid:string):Promise<Bookmark[]>;
    /**
     * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
     * @param {string} tid Tuit id for which users who bookmarked are to be retrieved
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit(tid:string):Promise<Bookmark[]>;
}