/**
 * @file imports mongoose schema for Follow.
 */
import mongoose, { Schema } from "mongoose";
import Follow from '../models/Follow';
/**
  * @typedef FollowsSchema is how follows are represented.
  * @property {userFollowedBy} userid: primary keys of user following a user.
  * @property {userFollowing} userid: primary keys of user following a user.
  */
const FollowSchema = new mongoose.Schema<Follow>({
    self_user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'follow'});
export default FollowSchema;