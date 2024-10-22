import express, {Application} from 'express';
import cors from 'cors';
import { db } from '../database/db';
import routerTest from '../routes/routerTest';
import { PORT } from '../config/config';


class Server{
    private app: Application;
    private port: number;
    constructor(){
        this.app = express();
        this.port = Number(PORT);

        this.dbConnect();
        this.middlewares();
        this.routes();
    }

    private async dbConnect(): Promise <void>{
        await db.connect();
    }
    private async middlewares(): Promise <void>{
        this.app.use(express.json());
        this.app.use(cors());
    }
    private routes():void{
        this.app.use(routerTest);
    }
    public listen():void{
        this.app.listen(this.port, async()=>{
            console.log("Servidor funcionando en el puerto: "+ this.port);
        })
    }

}

export default Server;