/**
 * @file MessageModel implements the mongoose model to CRUD docs in message collection.
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
const MessageModel = mongoose.model('MessageModel', MessageSchema);
export default MessageModel;