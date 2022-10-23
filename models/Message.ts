import User from "./User";

export default interface Message {
    sender:User,
    sentOn:Date,
    receiver:User,
    message:string
 };