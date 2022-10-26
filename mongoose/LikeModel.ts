/**
 * @file LikeModel implements the mongoose model to CRUD docs in likes collection.
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
const LikeModel = mongoose.model('LikeSchema', LikeSchema);
export default LikeModel;