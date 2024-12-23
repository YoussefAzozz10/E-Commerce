import { Schema,model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        minlength:3,
        trim:true
    },
    role:{
        type:String,
        default:"admin",
        enum:['user','admin']
    },
    wishList:[{type: Schema.ObjectId,ref: 'Product'}],
    isActive:{
        type:Boolean,
        default:true
    },
    addresses: [{
        city: String,
        street: String,
        phone: String
    }],
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

userSchema.pre('save',function(){

    this.password = bcrypt.hashSync(this.password,parseInt(process.env.SALT_ROUND));
});

userSchema.pre('findOneAndUpdate',function(){

    if(this._update.password)
        this._update.password = bcrypt.hashSync(this._update.password,parseInt(process.env.SALT_ROUND));

});

export const userModel = model("User",userSchema);