import { cartModel } from "../../../Database/Model/Cart.Model.js";
import { couponModel } from "../../../Database/Model/Coupon.Model.js";
import { productModel } from "../../../Database/Model/Product.Model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/ErrorHandling.js";


function calcTotalPrice(checkCart){

    let totalPrice = 0;

    checkCart.cartItems.forEach(elm=>{
        totalPrice+=elm.quantity * elm.price;
    })
    checkCart.totalPrice = totalPrice;
}

function calcPriceAfterDiscount(cart)
{
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100;
}

export const addToCart = catchError(async (req,res,next)=>{

    const checkProduct = await productModel.findById(req.params.id).select('price stock');

    !checkProduct && next(new AppError("Product ID not found",404));

    const checkCart = await cartModel.findOne({user:req.user._id});

    if((checkProduct.stock - req.body.quantity) < 0)
    {
        return res.status(200).json({message:"Quantity unavailable",checkCart});
    }

    if(!checkCart)
    {
        if((checkProduct.stock - req.body.quantity) < 0)
        {
            return res.status(200).json({message:"Quantity unavailable"});
        }
        let cart = new cartModel({
            user:req.user._id,
            cartItems:[{
                product: req.params.id,
                price:checkProduct.price,
                quantity:req.body.quantity
            }]
        });

        calcTotalPrice(cart);
        
        await cart.save();
        
        return res.status(201).json({message:"Done",cart});
    }
    
    

    let item = checkCart.cartItems.find(elm=>elm.product==req.params.id);

    if(item)
        item.quantity += req.body.quantity || 1;

    else{checkCart.cartItems.push({product:req.params.id,price:checkProduct.price,quantity:req.body.quantity});}

    calcTotalPrice(checkCart);

    if(checkCart.discount)
    {
        checkCart.totalPriceAfterDiscount = checkCart.totalPrice - (checkCart.totalPrice * checkCart.discount)/100;
    }

    
    await checkCart.save();
    
    res.status(201).json({message:"Add to cart",checkCart});

});


export const getCart = catchError(async (req,res,next)=>{

    const cart = await cartModel.findOne({user:req.user._id}).populate('cartItems.product');

    !cart && next(new AppError("Product ID not found"));

    if(cart.discount)
    {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100;
    }

    cart && res.status(200).json({message:"Done",cart:cart});

});


export const removeFromCart = catchError(async (req,res,next)=>{
    
    const cart = await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true});

    !cart && next(new AppError("Product ID not found"));
    
    calcTotalPrice(cart);

    if(cart.discount)
    {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount)/100;
    }

    await cart.save();
    
    return res.status(200).json({message:"Updated",cart});

});


export const clearCart = catchError(async (req,res,next)=>{
    
    const cart = await cartModel.findOneAndUpdate({user:req.user._id},{cartItems:[]},{new:true});

    !cart && next(new AppError("Product ID not found"));
    
    calcTotalPrice(cart);

    await cart.save();
    
    return res.status(200).json({message:"Cart is clear",cart});

});


export const applyCoupon = catchError(async(req,res,next)=>{

    const coupon = await couponModel.findOne({code:req.body.code,expires:{$gt: Date.now()}});
    
    !coupon && next(new AppError("Coupon ID not found"));

    const cart = await cartModel.findOne({user:req.user._id});
    !cart && next(new AppError("User ID not found"));

    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount)/100;
    cart.discount = coupon.discount;

    calcPriceAfterDiscount(cart);
    
    await cart.save();
    
    return res.status(200).json({message:"Done",cart});

});


export const updateProductCartQuantity = catchError(async (req,res,next)=>{

    const product = await productModel.findById(req.params.id).populate('price stock');

    !product && next(new AppError("Product ID not found",404));

    const cart = await cartModel.findOne({user:req.user._id});
    !cart && next(new AppError("Cart ID not found",404));

    let item = cart.cartItems.find(elm=>elm.product==req.params.id);

    if(item)
    {
        if((product.stock - req.body.quantity) < 0)
        {
            return res.status(200).json({message:"Quantity unavailable"}); 
        }
        item.quantity=req.body.quantity;
        calcTotalPrice(cart);
        cart.discount && calcPriceAfterDiscount(cart);
        
        await cart.save();
        
        return res.status(200).json({message:"Done",cart});
    }
    
    return next(new AppError("This Product does not exist in the cart",409));

});