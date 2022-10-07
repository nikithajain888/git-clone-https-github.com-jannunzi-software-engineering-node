/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import UserDao from './daos/UserDao';
import UserController from './controllers/UserController';
import TuitDao from './daos/TuitDao';
import TuitController from './controllers/TuitController';
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));


 const userDao = new UserDao();
 const userController = new UserController(app, userDao);
 const tuitDao = new TuitDao();
 const tuitController = new TuitController(app, tuitDao);
 const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}
 mongoose.connect('mongodb://127.0.0.1:27017/FSE-DB', options);
 /**
 * Start a server listening at port 4001 locally
 * but use environment variable PORT on Heroku if available.
 */
 const PORT = 4001;
 app.listen(process.env.PORT || PORT);