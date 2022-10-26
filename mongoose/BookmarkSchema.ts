/**
 * @file imports mongoose schema for bookmarks.
 */

import mongoose, { Schema } from "mongoose";
import Bookmark from '../models/Bookmark';
/**
  * @typedef BookmarksSchema is how bookmarks are represented.
  * @property {bookmarkedBy} userid: primary key of user who bookmarked tuit
  * @property {tuit} tid: primary key of tuit bookmarked.
  */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: 'bookmarks' });
export default BookmarkSchema;