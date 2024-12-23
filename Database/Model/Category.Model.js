import { Schema , model } from "mongoose";
import slugify from "slugify";


const categorySchema=new Schema({

    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[2,'Too short Category name'],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    image:{
        type:String,
    }

},{
    timestamps:true
});

categorySchema.pre('save',function(){

    this.slug = slugify(this.name);
});

categorySchema.post('init',function(doc){

    doc.image = process.env.BASE_URL+"category/"+doc.image
});

export const categoryModel = model('Category',categorySchema);