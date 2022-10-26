/**
* @file Implements DAO managing data storage of Follow. Uses mongoose FollowModel
* to integrate with MongoDB
*/
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";

 /**
  * @class FollowDao Implements Data Access Object managing data storage
  * of Follows
  * @property {FollowDao} followDao Private single instance of FollowDao
  */

export default class FollowDao implements FollowDaoI {
      /**
   * Inserts follow instance into the database
   * @param {string} uid_cur User who will follow
   * @param {string} uid User who will be followed
   * @returns Promise To be notified when message is inserted into the database
   */
    userFollowsAnotherUser = async(uid_cur: String, uid: string): Promise<any> =>
        FollowModel.create({self_user:uid_cur,userFollowing:uid});

        /**
   * Removes follow instance from the database
   * @param {string} uid_cur User who will unfollow
   * @param {string} uid User who will be unfollowed
   * @returns Promise To be notified when message is deleted from the database
   */
    userUnfollowsAnotherUser = async(uid_cur: String, uid: string): Promise<any> =>
        FollowModel.deleteOne({self_user:uid_cur,userFollowing:uid});


    /**
      * Uses FollowModel to retrieve all follower documents from follows collection
      * @param {string} uid User id for which follower users will be retrieved
      * @returns Promise To be notified when the followers are retrieved from
      * database
      */

    findAllFollowers = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("self_user")
            .exec();
    
    /**
      * Uses FollowModel to retrieve all following documents from follows collection
      * @param {string} uid User id for which following users will be retrieved
      * @returns Promise To be notified when the following are retrieved from
      * database
      */
    findAllFollowing = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({self_user: uid})
            .populate("userFollowing")
            .exec();


    private static followDao: FollowDao | null = null;

    /**
     * Creates a singleton instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
}