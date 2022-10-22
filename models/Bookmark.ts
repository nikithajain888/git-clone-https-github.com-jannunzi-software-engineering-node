import User from "./User";
import Tuit from "./Tuit";

export default interface Bookmark {
    tuit:Tuit,
    bookmarkedBy:User
 };