import {Request, Response} from "express";

export default interface FollowControllerI {
    userBookmarksTuit(req: Request, res: Response): void;
    userUnBookmarksTuit(req: Request, res: Response): void;
    findAllBookmarksByUser(req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit(req: Request, res: Response): void;
};