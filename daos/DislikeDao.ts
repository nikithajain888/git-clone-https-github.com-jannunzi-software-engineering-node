/**
* @file Implements DAO managing data storage of dislikes. Uses mongoose dislikeModel
* to integrate with MongoDB
*/
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";
import DislikeDaoI from "../interfaces/DislikeDao";
import User from "../models/User";
import Tuit from "../models/Tuit";

/**
 * @class dislikeDao Implements Data Access Object managing data storage
 * of disdisdislike
 * @property {UserDao} userDao Private single instance of dislikeDao
 */

export default class DislikeDao implements DislikeDaoI {
    
    /**
  * Uses dislikeModel to create a new disdislike for tuit.
  * @param {string} uid User id of user who dislikes the tuit
  * @param {string} tid Tuit id of tuit to be disliked
  * @returns Promise To be notified when the dislikes are retrieved from
  * database
  */

     userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });

    /**
 * Uses dislikeModel to remove a  disdislike for tuit.
 * @param {string} uid User id of user who undislikes the tuit
 * @param {string} tid Tuit id of tuit to be undisliked
 * @returns Promise To be notified when the dislikes are deleted from
 * database
 */

    /**
 * Uses dislikeModel to count number of dislikes a tuit has.
 * @param {string} tid Tuit id of tuit to be undisliked
 * @returns Promise To be notified with the total dislikes on specific tuit.
 */
     findTuitDislikesCount = async (tid: string): Promise<any> =>
        DislikeModel.countDocuments({ tuit: tid });

    /**
   * Uses dislikeModel to remove a  disdislike for tuit.
   * @param {string} uid User id of user who undislikes the tuit
   * @param {string} tid Tuit id of tuit to be undisliked
   * @returns Promise To be notified when the dislikes are deleted from
   * database
   */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

    /**
      * Uses dislikeModel to retrieve all user documents from dislikes collection
      * @returns Promise To be notified when the users are retrieved from
      * database
      */

     findAllUsersThatDislikeTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

    /**
      * Uses dislikeModel to retrieve all disdislike documents from dislikes collection
      * @returns Promise To be notified when the dislikes are retrieved from
      * database
      */
     findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ dislikedBy: uid })
            .populate("tuit")
            .exec();

    findUserDislikesTuit = async (uid:string,tid:string):Promise<Dislike[]>=>
        DislikeModel
        .find({dislikedBy:uid, tuit:tid})

    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns dislikeDao
     */

    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

}