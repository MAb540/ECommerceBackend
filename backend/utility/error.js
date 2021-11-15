export class BadRequestError extends Error{
    constructor(statusCode,message){
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default BadRequestError;



// class ErrorHandler extends Error{
   
//     constructor(statusCode,message){
//         super();
//         this.message = message;
//         this.statusCode = statusCode;
//     }
// }



//
