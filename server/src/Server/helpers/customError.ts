export class CustomError {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message:string){
      this.message = message;
      this.statusCode = statusCode;
    }
  
}


