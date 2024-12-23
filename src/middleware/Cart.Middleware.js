import { cartModel } from "../../Database/Model/Cart.Model.js";
import { catchError } from "../utils/ErrorHandling.js";




export const hasCart = catchError(async (req,res,next)=>{


    const hasCartBefore = await cartModel.findOne({user:req.user._id});

    if(hasCartBefore)
    {
        req.cart = hasCartBefore;
        return next();
    }

    const createCart = await cartModel.create({user:req.user._id});

    req.cart = createCart;

    return next();

});
