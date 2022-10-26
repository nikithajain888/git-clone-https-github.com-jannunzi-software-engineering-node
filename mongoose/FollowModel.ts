
/**
 * @file FollowModel implements the mongoose model to CRUD docs in follow collection.
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
const FollowModel = mongoose.model('FollowSchema', FollowSchema);
export default FollowModel;