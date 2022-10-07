import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find();
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString()??'',
                    tuitMongooseModel?.tuit??''
                );
            });
        return tuitModels;
    }
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.where({postedBy:uid});
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString()??'',
                    tuitMongooseModel?.tuit??''
                );
            });
        return tuitModels;
    }
    async findTuitById(tid: string): Promise<any> {
        const tuitMongooseModel = await TuitModel.findById(tid);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??''
        );
    }
    async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await TuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString()??'',
            tuitMongooseModel?.tuit??''
        );
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: {
            tuit: tuit,
        }});
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }

}