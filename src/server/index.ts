import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import Controller from './controller';

class Server {
    public app: any;

    constructor() {
        this.app = express();
        this.middleware();
    }

    private middleware() {
        /**
         * Initialize Modules Setup
         */
        require('./setup')(this.app);

        /**
         * CORS setup
         */
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });

        this.app.use(bodyParser.json());

        this.app.use(express.static(path.join(__dirname, '../public')));
        /**
         * Custom Logger
         */
        logger.token('date', (req, res, tz) => {
            return this.app.globals.calcTime(5.5);
        });

        logger.format('myformat', '[:date[Asia/Kolkata]] ":method :url" :status :res[content-length] - :response-time ms');
        this.app.use(logger('myformat'));
        //this.app.use(logger('dev'));
        /**
         * API Route
         */
        this.app.use('/api/v1', new Controller().router);
    }

}

export default new Server().app;