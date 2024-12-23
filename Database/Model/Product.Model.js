import { Schema,model } from "mongoose";


const productSchema = new Schema({

    title:{

        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[3,"Too Short Product name"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0,
        min:0,
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        default:0,
        min:0,
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:[100,'Too Long Description'],
        minlength:[5,'Too Short Description']
    },
    stock:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    soldItem:{
        type:Number,
        default:0,
        min:0
    },
    imgCover:{
        type:String
    },
    images:{
        type:[String]
    },
    category:{
        type:Schema.ObjectId,
        ref:"Category",
        required:true
    },
    subCategory:{
        type:Schema.ObjectId,
        ref:"subCategory",
        required:true
    },
    brand:{
        type:Schema.ObjectId,
        ref:"Brand",
        required:true
    },
    ratingAvg:{
        type:Number,
        min:1,
        max:5
    },
    ratingCount:{
        type:Number,
        min:0
    },
    createdBy:{
        type:Schema.ObjectId,
        ref:"User",
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
},{
    timestamps:true,toJSON: { virtuals: true }
});

productSchema.post('init',function(doc){

    if(doc.imgCover && doc.images)
    {
        doc.imgCover = process.env.BASE_URL+"product/"+doc.imgCover;
        doc.images = doc.images.map(elm=> process.env.BASE_URL+"product/"+elm);
    }
    
});

productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
  });

productSchema.pre(/^find/,function(){
    this.populate('reviews');
});

export const productModel = model("Product",productSchema);