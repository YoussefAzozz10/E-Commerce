import { userModel } from "../../../Database/Model/User.Model.js";
import { catchError } from "../../utils/ErrorHandling.js";
import CryptoJS from "crypto-js";

export const addToAddress = catchError(async (req,res,next)=>{

    const {city,street,phone} = req.body;

    const encrypted = CryptoJS.AES.encrypt(phone, process.env.SECRET_KEY, { iv: process.env.IV }).toString();

    const adddedToddress = await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addresses: {city,street,phone:encrypted}}},{new:true});

    !adddedToddress && next(new AppError("In-Valid user ID"));
    adddedToddress && res.status(200).json({message:"Done",adddedToddress});

});


export const deleteAddress = catchError(async (req,res,next)=>{
    
    const removeFromaddress = await userModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true});

    !removeFromaddress && next(new AppError("In-Valid user ID"));
    removeFromaddress && res.status(200).json({message:"Deleted",addresses:removeFromaddress.addresses});
});


export const getAllAddresses = catchError(async (req,res,next)=>{
    
    const result = await userModel.findById(req.user._id).populate('addresses');

    result.addresses = result.addresses.map(elm=> elm.phone=CryptoJS.AES.decrypt(elm.phone, process.env.SECRET_KEY, { iv: process.env.IV }).toString(CryptoJS.enc.Utf8));


    !result && next(new AppError("In-Valid product ID"));
    result && res.status(200).json({message:"Done",addresses:result.addresses});

});