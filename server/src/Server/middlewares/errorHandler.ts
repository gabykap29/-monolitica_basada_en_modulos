import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, req: Request, res:Response, next: NextFunction){
    //Error en consola
    console.error(err.stack);
    //si el error tiene codigo de estado muestra, sino 500 por defecto
    const statuscode = err.statusCode || 500;

    //enviar la respuesta 
    res.status(statuscode).json({
        status: statuscode,
        message: err.message || 'Error interno del servidor!'
    });
    
}

export default errorHandler;