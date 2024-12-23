import { brandModel } from "../../../Database/Model/Brand.Model.js";
import { addItem, deleteOne, getAllItems, updateOne } from "../../middleware/Handlers/Factory.js";


export const addBrand = addItem(brandModel,'brand');

export const getAllBrands = getAllItems(brandModel);

export const deleteBrand = deleteOne(brandModel,'brand');

export const updateBrand = updateOne(brandModel,'brand');