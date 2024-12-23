import { cartModel } from "../../../Database/Model/Cart.Model.js";
import { orderModel } from "../../../Database/Model/Order.Model.js";
import { productModel } from "../../../Database/Model/Product.Model.js";
import { catchError } from "../../utils/ErrorHandling.js";
import CryptoJS from "crypto-js";


export const createCashOrder = catchError(async(req,res,next)=>{

    //getCart
    const cart = await cartModel.findOne({user:req.user._id});
    //CalcTotalPrice
    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
    //create Order
    const {city,street,phone} = req.body;

    const encrypted = CryptoJS.AES.encrypt(phone, process.env.SECRET_KEY, { iv: process.env.IV }).toString();


    const order = await orderModel.create({user:req.user._id,totalOrderPrice:totalOrderPrice,cartItems:cart.cartItems,shippingAddress:{city:city,street:street,phone:encrypted}});

    //increment sold & decrement quantity
    // cart.cartItems.forEach(async elm => {
    //     let item = await productModel.findById({_id:elm.product});
    //     await productModel.findByIdAndUpdate({_id:elm.product},{stock:(item.stock-elm.quantity),soldItem:(item.soldItem+elm.quantity)});
    // });

    // bulkWrite

    let options = cart.cartItems.map(item=>({

        updateOne:{
            filter:{_id:item.product},
            update:{$inc:{quantity:-item.quantity , soldItem:+item.quantity}}
        }
    }));

    await productModel.bulkWrite(options);

    
    //clear user cart
    const cartAfterClear = await cartModel.findOneAndUpdate({user:req.user._id},{cartItems:[]},{new:true});

    return res.status(201).json({message:"Done",order,cartAfterClear});

});


export const getUserOrders = catchError(async(req,res,next)=>{

    const orders = await orderModel.find({user:req.user._id});
    
    !orders.length && res.status(200).json({message:"No Orders yet"});
    orders.length && res.status(200).json({message:"Done",orders});

});


export const getSpecificOrder = catchError(async(req,res,next)=>{

    const order = await orderModel.findById({_id:req.params.id}).populate("cartItems.product");
    
    !order && res.status(200).json({message:"Order ID not found"});
    order && res.status(200).json({message:"Done",order});

});

export const getAllOrders = catchError(async(req,res,next)=>{

    const orders = await orderModel.find().populate("cartItems.product");
    
    !orders.length && res.status(200).json({message:"No orders yet"});
    orders && res.status(200).json({message:"Done",orders});

});


export const deleteOrder = catchError(async (req,res,next)=>{

    const order = await orderModel.findByIdAndDelete({_id:req.params.id});
    
    !order && res.status(200).json({message:"Order ID not found"});
    order && res.status(200).json({message:"Deleted",order});

});

