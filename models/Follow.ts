import User from "./User";

export default interface Follow {
    userFollowedBy:User,
    userFollowing:User
 };