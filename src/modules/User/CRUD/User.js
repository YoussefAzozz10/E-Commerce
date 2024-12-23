import { tokenModel } from "../../../../Database/Model/Token.Model.js";
import { userModel } from "../../../../Database/Model/User.Model.js";
import { sendEmail } from "../../../emails/NodeMailer.js";
import { AppError } from "../../../utils/AppError.js";
import { catchError } from "../../../utils/ErrorHandling.js";
import jwt from "jsonwebtoken";
import { htmlCode } from "../../../emails/HTMLConfirmEmail.js";


export const getUsers = catchError(async (req,res,next)=>{

    if(req.params.id)
    {
        const getSpecificUser = await userModel.findById({_id:req.params.id});
        !getSpecificUser && res.status(200).json({message:"User Not found"});
        getSpecificUser && res.status(200).json({message:"Done",getSpecificUser});
    }
    else
    {
        const getAllUsers = await userModel.find();
        !getAllUsers && res.status(200).json({message:"No users found",getAllUsers});
        getAllUsers && res.status(200).json({message:"Done",getAllUsers});
    }
})





export const updateUserEmail = catchError(async (req,res,next)=>{

    const {email} = req.body;

    const updateEmail = await userModel.findByIdAndUpdate({_id:req.user._id},{email:email},{new:true});

    !updateEmail && next(new AppError("User ID not found",400));

    const expireToken = await tokenModel.findOneAndUpdate({tokenValue: req.token.tokenValue},{expired:true},{new:true});
    
    !expireToken && next(new AppError("Token has not been expired",401));

    const userToken = jwt.sign(
        {email:updateEmail.email , id:updateEmail._id},
        process.env.TOKEN_SIGNATURE,
        {expiresIn:'1d'}
    );

    await tokenModel.create({tokenValue:userToken,user:req.user._id});

    sendEmail({email , userToken , subject:"Confirmation Email" , htmlCode});


    return res.status(200).json({message:"Done",updateEmail,userToken});

});

export const deleteUser = catchError(async (req,res,next)=>{

    
    const {id} = req.params;

    const deletedUser = await userModel.findByIdAndDelete({_id:id});

    !deletedUser && next(new AppError("No User with this ID",400));
    deletedUser && res.status(200).json({message:"Deleted",deletedUser});

});


export const changeUserPassword = catchError(async (req,res,next)=>{

    const updateToken = await tokenModel.findOneAndUpdate({tokenValue: req.token.tokenValue,user:req.user._id},{expired:true},{new:true});

    !updateToken && next(new AppError("In-Valid Token",401));

    const user = await userModel.findByIdAndUpdate({_id: req.params.id},{password: req.body.password},{new: true});
    !user && next(new AppError("User not found",400));

    const userToken = jwt.sign(
        {email:user.email , name:user.name , id:user._id , role: user.role},
        process.env.TOKEN_SIGNATURE,
        {expiresIn:'1d'}
    );

    await tokenModel.create({tokenValue:userToken,user:req.user._id});

    return res.status(200).json({message:"Updated",user,userToken});

});