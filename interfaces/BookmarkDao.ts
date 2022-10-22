import Bookmark from "../models/Bookmark";
import User from "../models/User";

export default interface BookmarkDaoI {
    userBookmarksTuit(uid:String, tid:string):Promise<any>;
    userUnBookmarksTuit(uid_cur:String, tid:string):Promise<any>;
    findAllBookmarksByUser(uid:string):Promise<Bookmark[]>;
    findAllUsersThatBookmarkedTuit(tid:string):Promise<Bookmark[]>;
}