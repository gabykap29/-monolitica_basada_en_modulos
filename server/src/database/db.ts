import mongoose, {Connection} from "mongoose";
import { mongoUri } from "../Server/config/config"; 

class dbManager{
    private static instance: dbManager | null = null;
    private connectionDb: Connection | null = null
    private uri : string | undefined = mongoUri;

    private constructor(){
    }

    public static getInstance():dbManager{
        if(dbManager.instance === null){
            dbManager.instance = new dbManager();
        }
        return dbManager.instance;
    }
    public async connect(): Promise <void>{
        if(this.connectionDb){
            console.log("Conexión activa!");
            return;
        }
        
        try {
            if(this.uri !== undefined){
                const connection = await mongoose.connect(this.uri);
                this.connectionDb = connection.connection;
                console.log("conexión establecida!");
            }else{
                console.log("No se ha proporcionado una url válida!");
            }
            
        } catch (error) {
            console.log("Error al intentar conectar a la base de datos" + error);
            throw error;
        }
    }
    public getConnection():Connection | null {
        return this.connectionDb;
    }
}

export const db = dbManager.getInstance();