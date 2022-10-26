/**
 * @file declares Follow datatype.
 */
import User from "./User";
/**
  * @typedef Follow represents user it is being followed by
  * and user its following.
  */
export default interface Follow {
    self_user:User,
    userFollowing:User
 };