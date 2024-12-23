import { Schema , model } from "mongoose";
import slugify from "slugify";


const subCategorySchema=new Schema({


    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[2,'Too short subCategory name'],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true
    },
    image:{
        type:String,
    },
    category:{
        type: Schema.ObjectId,
        required:true,
        ref:"Category"
    }

});

subCategorySchema.post('init',function(doc){

    doc.image = process.env.BASE_URL+"subCategory/"+doc.image
});

subCategorySchema.pre('save',function(){

    this.slug = slugify(this.name);
});

export const subCategoryModel = model('subCategory',subCategorySchema);