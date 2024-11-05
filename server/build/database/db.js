"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../Server/config/config");
class dbManager {
    constructor() {
        this.connectionDb = null;
        this.uri = config_1.mongoUri;
    }
    static getInstance() {
        if (dbManager.instance === null) {
            dbManager.instance = new dbManager();
        }
        return dbManager.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connectionDb) {
                console.log("Conexión activa!");
                return;
            }
            try {
                if (this.uri !== undefined) {
                    const connection = yield mongoose_1.default.connect(this.uri);
                    this.connectionDb = connection.connection;
                    console.log("conexión establecida!");
                }
                else {
                    console.log(this.uri);
                    console.log("No se ha proporcionado una url válida!");
                }
            }
            catch (error) {
                console.log("Error al intentar conectar a la base de datos" + error);
                throw error;
            }
        });
    }
    getConnection() {
        return this.connectionDb;
    }
}
dbManager.instance = null;
exports.db = dbManager.getInstance();
