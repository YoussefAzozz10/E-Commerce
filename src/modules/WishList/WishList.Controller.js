import { userModel } from "../../../Database/Model/User.Model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/ErrorHandling.js";


export const addToWishList = catchError(async (req,res,next)=>{

    const adddedToWishList = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:req.params.id}},{new:true});

    !adddedToWishList && next(new AppError("In-Valid product ID"));
    adddedToWishList && res.status(200).json({message:"Done",adddedToWishList});
});

export const removeFromWishList = catchError(async (req,res,next)=>{

    const removeFromWishList = await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishList:req.params.id}},{new:true});

    !removeFromWishList && next(new AppError("In-Valid product ID"));
    removeFromWishList && res.status(200).json({message:"Done",removeFromWishList});
});

export const getAllWishList = catchError(async (req,res,next)=>{

    const result = await userModel.findById(req.user._id).populate('wishList');

    !result && next(new AppError("In-Valid product ID"));
    result && res.status(200).json({message:"Done",wishList:result.wishList});

});