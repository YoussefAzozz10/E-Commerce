import { categoryModel } from "../../../Database/Model/Category.Model.js";
import { addItem, deleteOne, getAllItems, updateOne } from "../../middleware/Handlers/Factory.js";


export const addCategory = addItem(categoryModel,'category');

export const getAllCategories = getAllItems(categoryModel);

export const deleteCategory = deleteOne(categoryModel,'category');

export const updateCategory = updateOne(categoryModel,'category');
