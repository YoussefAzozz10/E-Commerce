import { Schema,model } from "mongoose";


const reviewSchema = new Schema({

    text:{
        type:String,
        required:true,
        minlength:[5,'Too Short Description'],
        trim:true
    },
    product:{
        type:Schema.ObjectId,
        ref:"Product",
        required:true
    },
    user:{
        type:Schema.ObjectId,
        ref:"User",
        required:true
    },
    rate:{
        type:Number,
        required:true,
        min:1,
        max:5
    }

},{
    timestamps:true
});


reviewSchema.pre(/^find/,function(){
    this.populate('user','name');
});

export const reviewModel = model("Review",reviewSchema);