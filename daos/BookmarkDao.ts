 /**
 * @file Implements DAO managing data storage of bookmark. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";

/**
  * @class BookmarkDao Implements Data Access Object managing data storage
  * of Bookmarks
  * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
  */

export default class BookmarkDao implements BookmarkDaoI {
    /**
     * Uses BookmarksModel to delete a Bookmark for tuit.
     * @param {string} uid User id of user who unbookmark the tuit
     * @param {string} tid Tuit id of tuit to be unbookmark
     * @returns Promise To be notified when the bookmark is deleted from
     * database
     */  
    userUnBookmarksTuit = async (uid: String, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy:uid,tuit:tid});

    /**
     * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
     * @param {string} uid User id for which bookmarks are to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */

    findAllBookmarksByUser = async(uid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({bookmarkedBy:uid})
        .populate("tuit")
        .exec();

    /**
      * Uses BookmarkModel to retrieve all users documents from bookmarks collection
      * @param {string} tid Tuid id for which users are to be retrieved
      * @returns Promise To be notified when the users are retrieved from
      * database
      */
    findAllUsersThatBookmarkedTuit = async(tid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({tuit:tid})
        .populate("bookmarkedBy")
        .exec();
    
    /**
     * Uses BookmarkModel to create a new Bookmark for a user for specified tuit.
     * @param {string} uid User id who wants to bookmark a tuit
     * @param {string} tid Tuit id of tuit to be bookmarked
     * @returns Promise To be notified when the bookmark is added to the
     * database
     */
    userBookmarksTuit = async(uid: String, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy:uid,tuit:tid});

    private static bookmarkdao: BookmarkDao | null = null;
    /**
     * Creates a singleton instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkdao === null) {
            BookmarkDao.bookmarkdao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkdao;
    }
}