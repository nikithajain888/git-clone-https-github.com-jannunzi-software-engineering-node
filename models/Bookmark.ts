/**
 * @file declares Bookmark datatype.
 */
import User from "./User";
import Tuit from "./Tuit";
 /**
  * @typedef Bookmark represents the bookmark type of a
  * tuit and bookmarkedby.
  */
export default interface Bookmark {
    tuit:Tuit,
    bookmarkedBy:User
 };