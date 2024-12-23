import { Schema,model } from "mongoose";

const couponSchema = new Schema({

    code:{
        type:String,
        unique: true,
        required:true,
        trime:true
    },
    expires:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true,
        min:0
    }
},{
    timestamps:true
});

export const couponModel = model("Coupon",couponSchema);