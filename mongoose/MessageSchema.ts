/**
 * @file imports mongoose schema for Messages.
 */
import mongoose, { Schema } from "mongoose";
import Message from "../models/Message";
/**
 * @typedef MessagesSchema is how messages are represented.
 * @property {sender} userid: primary keys of sender
 * @property {receiver} userid: primary keys of receiver
 */
const MessageSchema = new mongoose.Schema<Message>({
   sender: { type: Schema.Types.ObjectId, ref: "UserModel" },
   receiver: { type: Schema.Types.ObjectId, ref: "UserModel" },
   message: { type: String },
   sentOn: { type: Date, default: Date.now }
}, { collection: 'message' });
export default MessageSchema;