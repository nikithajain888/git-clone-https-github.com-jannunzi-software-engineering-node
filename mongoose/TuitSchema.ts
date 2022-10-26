/**
 * @file imports mongoose schema for Tuit.
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit"
/**
 * @typedef TuitSchema is how tuits are represented.
 * @property {ObjecpostedBytId} userid: primary key of user
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
}, {collection: "tuits"});
export default TuitSchema;