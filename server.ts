/**
 * @file Implements an Express Node HTTP server.
 */
 import express, {Request, Response} from 'express';
 import mongoose from "mongoose";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import FollowController from "./controllers/FollowController";
 import LikeController from "./controllers/LikeController";
 import DislikeController from "./controllers/DislikeController";
 import MessageController from './controllers/MessageController';
 import BookmarkController from './controllers/BookmarkController';
 import AuthenticationController from './controllers/authcontroller';
 import session from "express-session";
 
 
 const connectionString="mongodb+srv://nikithajain888:Passwordfse@cluster0.uz88i7e.mongodb.net/FSE-DB?retryWrites=true&w=majority";
 mongoose.connect(connectionString);
 // const userName = process.env.USERNAME;
 // const password = process.env.PASSWORD;
 // const url = `mongodb+srv://${userName}:${password}@cluster0.f6urgn7.mongodb.net/Tuiter?retryWrites=true&w=majority`;
 // mongoose.connect(url)
 const cors = require('cors')
 const app = express();
 
 app.use(cors());
 app.use(express.json());
 let sess = {
     secret: 'process.env.SECRET',
     cookie: {
         secure: false
     }
  }
  if (process.env.ENV === 'PRODUCTION') {
     app.set('trust proxy', 1) // trust first proxy
     sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess));
  app.use(express.json());
  const userController = UserController.getInstance(app);
  const tuitController = TuitController.getInstance(app);
  const likesController = LikeController.getInstance(app);
  const dislikeController = DislikeController.getInstance(app);
  const followController = FollowController.getInstance(app);
  const bookmarkController = BookmarkController.getInstance(app);
  const messageController = MessageController.getInstance(app);
 AuthenticationController(app);
 FollowController.getInstance(app);
 LikeController.getInstance(app);
 DislikeController.getInstance(app);
 BookmarkController.getInstance(app);
 MessageController.getInstance(app);

 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome to Foundation of Software Engineering!!!!'));

 
 /**
  * Start a server listening at port 4000 locally
  * but use environment variable PORT on Heroku if available.
  */
 const PORT = 3000;
 app.listen(process.env.PORT || PORT);