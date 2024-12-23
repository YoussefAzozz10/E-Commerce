import { Schema,model } from "mongoose";


const orderSchema = new Schema({

    user:{
        type:Schema.ObjectId,
        ref:"User",
        required:true
    },
    cartItems:[
        {
            product: {type: Schema.ObjectId , ref:"Product"},
            quantity: Number,
            price: Number,
        }
    ],
    totalOrderPrice:{
        type: Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['cash','credit'],
        default:"cash"
    },
    shippingAddress:{
        street: String,
        city: String,
        phone: String
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:{
        type: Date
    },
    isDelivered:{
        type:Boolean,
        default: false
    }

},{
    timestamps:true
});


export const orderModel = model("Order",orderSchema);