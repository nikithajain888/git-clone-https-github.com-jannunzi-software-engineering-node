import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

// export default class TuitController implements TuitControllerI {
//     app: Express;
//     tuitDao: TuitDao;
//     constructor(app: Express, tuitDao: TuitDao) {
//         this.app = app;
//         this.tuitDao = tuitDao;
//         this.app.get('/tuits', this.findAllTuits);
//     }
    
//     findAllTuits = (req: Request, res: Response) =>
//         this.tuitDao.findAllTuits()
//             .then(tuits => res.json(tuits));
//  }

export default class TuitController implements TuitControllerI {
    app: Express;
   tuitDao: TuitDao;
   constructor(app: Express, tuitDao: TuitDao) {
       this.app = app;
       this.tuitDao = tuitDao;
       this.app.get('/tuits', this.findAllTuits);
       this.app.get('/tuits/:tuid', this.findTuitById);
       this.app.get('/users/:uid/tuits', this.findTuitsByUser);
       this.app.post('/tuits', this.createTuit);
       this.app.delete('/tuits/:tuid', this.deleteTuit);
       this.app.put('/tuits/:tuid', this.updateTuit);
   }
    
    
        findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
 
    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.tuid)
        .then(tuit => res.json(tuit));
    
    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
        .then(tuits => res.json(tuits));
    
    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body)
           .then(tuit => res.json(tuit));
    
    updateTuit= (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.uid, req.body)
           .then(status => res.json(status));
    
    deleteTuit= (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.tuid)
           .then(status => res.json(status));
}