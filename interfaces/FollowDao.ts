/**
 * @file Follow DAO Interface for RESTful Web service API follows resource
 */
 import Follow from "../models/Follow";
 /**
  * @interface FollowDao An interface for data access objects of follows of Tuiter.
  *
  */

export default interface FollowDao {
      /**
     * Uses FollowsModel to Inserts follow instance into the database
     * @param {string} uid_cur User which will follow
     * @param {string} uid User who will be followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser(uid_cur:String, uid:string):Promise<any>;
    /**
     * Uses FollowsModel to Removes follow instance from the database
     * @param {string} uid_cur User which will unfollow
     * @param {string} uid User who will be unfollowed
     * @returns Promise To be notified when unfollow is successful from the database
     */
    userUnfollowsAnotherUser(uid_cur:String, uid:string):Promise<any>;
    /**
     * Uses FollowsModel to retrieve all follows of the user.
     * @param {string} uid User for which following list is to be retrieved
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowers(uid:string):Promise<Follow[]>;
    /**
     * Uses FollowsModel to retrieve all following of the user.
     * @param {string} uid User for which following list is to be retrieved
     * @returns Promise To be notified when the following are retrieved from
     * database
     */
    findAllFollowing(uid:string):Promise<Follow[]>;
}