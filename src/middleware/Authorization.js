import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/ErrorHandling.js";
import jwt from 'jsonwebtoken';

export const authorizedRoutes =(...roles)=>{ 

    return catchError(async (req,res,next)=>{

    const decodedToken = jwt.verify(req.token.tokenValue,process.env.TOKEN_SIGNATURE);

    if(!roles.includes(decodedToken.role))
        return next(new AppError("Unauthorized api access because you are "+decodedToken.role,401));

    
    return next();

})};
