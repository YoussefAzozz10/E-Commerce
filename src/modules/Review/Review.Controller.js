import { reviewModel } from "../../../Database/Model/Review.Model.js";
import { getAllItems } from "../../middleware/Handlers/Factory.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/ErrorHandling.js";


export const createReview = catchError(async (req,res,next)=>{


    const checkUserReviewBefore = await reviewModel.findOne({user:req.user._id,product: req.params.productId});
    if(checkUserReviewBefore)
        return next(new AppError("You have already reviewd on this product",409));

    req.body.product = req.params.productId;

    req.body.user = req.user._id;

    const review = await reviewModel.create(req.body);

    return res.status(201).json({message:"Done",review});
});

export const getAllReviews = getAllItems(reviewModel);

export const getReview = catchError(async (req,res,next)=>{

    const review = await reviewModel.findById(req.params.id);

    !review && next(new AppError("Review not found",404));
    review && res.status(200).json({message:"Done",review});

});

export const deleteReview = catchError(async (req,res,next)=>{

    const review = await reviewModel.findByIdAndDelete(req.params.id);

    !review && next(new AppError("Review not found",404));
    review && res.status(200).json({message:"Deleted"});
});


export const updateReview = catchError(async (req,res,next)=>{

    let updatedObj={};
    if(req.body.text)
    {
        updatedObj["text"] = req.body.text;
    }

    if(req.body.rate)
    {
        updatedObj["rate"] = req.body.rate;
    }

    const review = await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},updatedObj,{new:true});

    !review && next(new AppError("Review not found",404));
    review && res.status(200).json({message:"Updated",review});

});