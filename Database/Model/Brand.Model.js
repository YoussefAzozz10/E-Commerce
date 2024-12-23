import { Schema , model } from "mongoose";
import slugify from "slugify";


const brandSchema = new Schema({

    name:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        required:true

    },
    logo:{
        type:String 
    }

},{
    timestamps:true
});

brandSchema.post('init',function(doc){

    doc.logo = process.env.BASE_URL+"brand/"+doc.logo
});

brandSchema.pre('save',function(){

    this.slug = slugify(this.name);
});

export const brandModel = model("Brand",brandSchema);