import { categoryModel } from "../../../Database/Model/Category.Model.js";
import { subCategoryModel } from "../../../Database/Model/SubCategory.Model.js";
import { deleteOne, updateOne } from "../../middleware/Handlers/Factory.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from "../../utils/ErrorHandling.js";


export const addSubCategory = catchError(async (req,res,next)=>{

    const checkCategoryID = await categoryModel.findById({_id:req.body.category});
    if(!checkCategoryID)
        return next(new AppError("Category ID not found",400));

    const checkName = await subCategoryModel.findOne({name: req.body.name});

    if(checkName)
        return next(new AppError("subCategory name exists",400));

    
    req.body.image = req.file.filename;

    const subCategoryItem = await subCategoryModel.create(req.body);

    return res.status(201).json({message:"Done",subCategoryItem});
        
});

export const deleteSubCategory = deleteOne(subCategoryModel,'subCategory');

export const updateSubCategory = updateOne(subCategoryModel,'subCategory');

export const getAllSubcategories = catchError(async (req,res,next)=>{

    let filter = {};
    if(req.params.id)
    {
        filter={category: req.params.id};
    }

    const allSubCategories = await subCategoryModel.find(filter);

    !allSubCategories.length && next(new AppError("No SubCategories found",200));
    allSubCategories.length && res.status(200).json({message:"Done",allSubCategories});

});


export const getSubCategory = catchError(async (req,res,next)=>{


    const subCategory = await subCategoryModel.findById(req.params.id);

    !subCategory && next(new AppError("SubCategory not found",404));
    subCategory && res.status(200).json({message:"Done",subCategory});




});