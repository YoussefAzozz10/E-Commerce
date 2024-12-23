import { Schema , model } from "mongoose";


const cartSchema = new Schema({

    user:{
        type: Schema.ObjectId,
        unique:true,
        required:true,
        ref:"User"
    },
    cartItems:[
        {
            product: {type: Schema.ObjectId , ref:"Product"},
            quantity: {type: Number,default: 1},
            price: Number,
            totalProductDiscount:Number
        }
    ],
    totalPrice:{
        type: Number,
        required:true
    },
    totalPriceAfterDiscount:{
        type: Number,
    },
    discount:{
        type:Number
    }

},
{
    timestamps:true
}
);


export const cartModel = model("Cart",cartSchema);