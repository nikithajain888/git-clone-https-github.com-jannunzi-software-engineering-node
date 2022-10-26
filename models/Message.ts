/**
 * @file declares Message datatype.
 */
import User from "./User";
/**
  * @typedef Message represents a message object with the
  * following properties.
  * @sender
  * @receiver
  * @sentOn
  * @message
  */
export default interface Message {
    sender:User,
    sentOn:Date,
    receiver:User,
    message:string
 };