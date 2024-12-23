import { userModel } from "../../../../Database/Model/User.Model.js";
import jwt from "jsonwebtoken";
import { catchError } from "../../../utils/ErrorHandling.js";
import { tokenModel } from "../../../../Database/Model/Token.Model.js";
import { sendEmail } from "../../../emails/NodeMailer.js";
import { htmlCode } from "../../../emails/HTMLConfirmEmail.js";
import { AppError } from "../../../utils/AppError.js";
import bcrypt from 'bcryptjs';


export const signup =catchError( async(req,res,next)=>{

    const {name,email,password,cPassword} = req.body;

    const userExisted = await userModel.findOne({email});
    
    if(userExisted)
    {
        return next(new AppError("Email already exists",409));
    }

    if(password !== cPassword)
    {
        return next(new AppError("CPassword not equl password",400));
    }

    const user = await userModel.create({name:name,email:email,password:password});

    const userToken = jwt.sign(
        {email:user.email , name:user.name , id:user._id , role: user.role},
        process.env.TOKEN_SIGNATURE,
        {expiresIn:'1d'}
    );

    sendEmail({email , userToken , subject:"Confirmation Email" , htmlCode});

    return res.status(201).json({message:"Done",user});

});


export const login = catchError(async(req,res,next)=>{

    const {email , password} = req.body;

    const checkUser = await userModel.findOne({email});

    if(!checkUser || !bcrypt.compareSync(password , checkUser.password))
        return next(new AppError("In-VALID Email or Password",409));

    

    const userToken = jwt.sign(
        {email:checkUser.email , name: checkUser.name , id:checkUser._id , role: checkUser.role},
        process.env.TOKEN_SIGNATURE,
        {expiresIn:'1d'}
    );

    const allTokens = await tokenModel.find({user:checkUser._id});
    
    for (let index = 0; index < allTokens.length; index++) {
        await tokenModel.updateMany({user:checkUser._id},{expired:true});
    }

    await tokenModel.create({tokenValue:userToken,user:checkUser._id});

    return res.status(200).json({message:"Done",userToken});

});

export const verifyEmail = catchError(async (req,res,next)=>{

    const {token} = req.params;

    const decodedToken = jwt.verify(token,process.env.TOKEN_SIGNATURE);

    await userModel.findByIdAndUpdate({_id:decodedToken.id} , {verified:true});

    return res.json({message:"Email has been verified"});

});


export const logout = catchError(async (req,res,next)=>{

    const expiredToken = await tokenModel.findOneAndUpdate({tokenValue:req.token.tokenValue},{expired:true},{new:true});

    return res.status(200).json({message:"Done",expiredToken});

});
