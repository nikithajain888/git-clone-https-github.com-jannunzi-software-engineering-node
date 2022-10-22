import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";

export default class FollowDao implements FollowDaoI {
    userFollowsAnotherUser = async(uid_cur: String, uid: string): Promise<any> =>
        FollowModel.create({userFollowedBy:uid_cur,userFollowing:uid});

    userUnfollowsAnotherUser = async(uid_cur: String, uid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowedBy:uid_cur,userFollowing:uid});

    findAllFollowers = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowedBy: uid})
            .populate("userFollowing")
            .exec();
    
    findAllFollowing = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowedBy")
            .exec();


    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
}