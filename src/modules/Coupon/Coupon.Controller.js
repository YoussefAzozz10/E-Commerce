import { couponModel } from "../../../Database/Model/Coupon.Model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/ErrorHandling.js";
import qrcode from "qrcode";

export const createCoupon = catchError(async (req,res,next)=>{


    const existedCoupon = await couponModel.findOne({code: req.body.code});

    existedCoupon && next(new AppError("Code already exists"),409);

    const coupon = await couponModel.create(req.body);

    return res.status(201).json({message:"Done",coupon});

});


export const getCoupon = catchError(async (req,res,next)=>{

    if(req.params.id)
    {
        const coupon = await couponModel.findById(req.params.id);

        !coupon && next(new AppError("Coupon ID not found"),404);

        let url = await qrcode.toDataURL(coupon.code);
        return res.status(200).json({message:"Done",coupon,url});
    }

    const coupons = await couponModel.find();
    
    !coupons.length && res.status(200).json({message:"No Coupons found",coupons});
    coupons.length && res.status(200).json({message:"Done",coupons});

});

export const deleteCoupon = catchError(async(req,res,next)=>{


    const coupon = await couponModel.findByIdAndDelete(req.params.id);

    !coupon && next(new AppError("Coupon ID not found"),404);
    coupon && res.status(200).json({message:"Deleted"});

});


export const updatetCoupon = catchError(async(req,res,next)=>{

    const coupon = await couponModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

    !coupon && next(new AppError("Coupon ID not found"),404);
    coupon && res.status(200).json({message:"Updated",coupon});

});
