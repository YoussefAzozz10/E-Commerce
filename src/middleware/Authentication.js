import jwt from 'jsonwebtoken';
import { catchError } from '../utils/ErrorHandling.js';
import { userModel } from '../../Database/Model/User.Model.js';
import { tokenModel } from '../../Database/Model/Token.Model.js';
import { AppError } from '../utils/AppError.js';


export const auth = catchError(async (req,res,next)=>{

    const {authorization} = req.headers;

    if(!authorization)
    {
        return next(new AppError("Authorization is required",401));
    }

    if(!authorization?.startsWith(process.env.BEARER_TOKEN))
    {
        return next(new AppError("Authorization is required",401));
    }

    const token = authorization.split(process.env.BEARER_TOKEN)[1];

    const decodedToken = jwt.verify(token,process.env.TOKEN_SIGNATURE);

    if(!decodedToken?.id)
    {
        return next(new AppError("In-Valid token payload",400));
    }

    const user = await userModel.findById({_id:decodedToken.id});

    if(!user)
    {
        return next(new AppError("In-Valid account",400));
    }

    req.user = user;

    const catchToken = await tokenModel.findOne({tokenValue:token,user:user._id});

    if(catchToken.expired)
    {
        return next(new AppError("Expired Token",401));
    }

    req.token = catchToken;

    return next();

});