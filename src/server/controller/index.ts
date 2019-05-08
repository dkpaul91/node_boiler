import { Router, Request, Response } from 'express';

export default class Controller {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router
            .get('/', (req: Request, res: Response) => {
                return res.send('Hello World!!');
            })
    }

}