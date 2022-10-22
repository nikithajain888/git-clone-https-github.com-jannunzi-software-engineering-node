import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";

export default class BookmarkDao implements BookmarkDaoI {
    userUnBookmarksTuit = async (uid: String, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy:uid,tuit:tid});

    findAllBookmarksByUser = async(uid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({bookmarkedBy:uid})
        .populate("tuit")
        .exec();

    
    findAllUsersThatBookmarkedTuit = async(tid: string): Promise<Bookmark[]> =>
        BookmarkModel
        .find({tuit:tid})
        .populate("bookmarkedBy")
        .exec();
    
    
    userBookmarksTuit = async(uid: String, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy:uid,tuit:tid});

    private static bookmarkdao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkdao === null) {
            BookmarkDao.bookmarkdao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkdao;
    }
}