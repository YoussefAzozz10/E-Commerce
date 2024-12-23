import { AppError } from "./AppError.js";


export const catchError = (fn)=>{

    return (req,res,next)=>{
        fn(req,res,next).catch((error)=>{
           console.log(error);
           return next(new AppError(error,500));
       })
   }

}