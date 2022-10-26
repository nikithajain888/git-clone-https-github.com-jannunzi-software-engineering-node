/**
 * @file imports mongoose schema for Like.
 */
import mongoose, { Schema } from "mongoose";
import Like from '../models/Like';
/**
  * @typedef LikesSchema is how likes are represented.
  * @property {likedBy} userid: primary key of user who liked tuit.
  * @property {tuit} tid: primary key of tuit liked.
*/
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'likes'});
export default LikeSchema;