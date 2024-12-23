import slugify from "slugify";
import { catchError } from "../../utils/ErrorHandling.js";
import { productModel } from "../../../Database/Model/Product.Model.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne, getAllItems, getSpecificItem } from "../../middleware/Handlers/Factory.js";
import { categoryModel } from "../../../Database/Model/Category.Model.js";
import { subCategoryModel } from "../../../Database/Model/SubCategory.Model.js";
import { userModel } from "../../../Database/Model/User.Model.js";


export const addProduct = catchError(async (req,res,next)=>{

    req.body.slug = slugify(req.body.title);
    const checkProduct = await productModel.findOne({title: req.body.title});

    checkProduct && next(new AppError("Proudct title already exists",409));

    const checkCategoryID = await categoryModel.findById({_id: req.body.category});
    const checkSubCategoryID = await subCategoryModel.findById({_id: req.body.subCategory});
    const checkUserID = await userModel.findById({_id: req.user._id});

    !checkCategoryID && next(new AppError("Category ID no found"));
    !checkSubCategoryID && next(new AppError("SubCategory ID no found"));
    !checkUserID && next(new AppError("User ID no found"));
    
    req.body.imgCover = req.files.imgCover[0].filename;

    req.body.images = req.files.images.map(elm=> elm.filename);
    req.body.createdBy=req.user._id;

    const product = await productModel.create(req.body);

    return res.status(201).json({message:"Done",product});

});


export const getProducts = getAllItems(productModel,'Product');

export const getSpecificProduct = getSpecificItem(productModel,'product');

export const deleteProduct = deleteOne(productModel,'Product');

export const updateProduct = catchError(async (req,res,next)=>{

    const {price} = req.body;
    const {id} = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate({_id:id},{price:price},{new:true});

    !updatedProduct && next(new AppError("product ID does not exist",404));
    updatedProduct && res.status(200).json({message:"Done",updatedProduct});

});
