import Follow from "../models/Follow";
import User from "../models/User";

export default interface FollowDao {
    userFollowsAnotherUser(uid_cur:String, uid:string):Promise<any>;
    userUnfollowsAnotherUser(uid_cur:String, uid:string):Promise<any>;
    findAllFollowers(uid:string):Promise<Follow[]>;
    findAllFollowing(uid:string):Promise<Follow[]>;
}