import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import * as subCategoryController from "./subCategory.Controller.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import * as validators from "../../middleware/validation/Items.Validation.js";
import { addSubCategoryValidation, getItemParamsRequired, updateSubCategoryValidation } from "./SubCategory.Validation.js";
import { fileExtensionsValidation, uploadSingleFile } from "../../multer/multer.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";

const subCategoryRouter = Router({mergeParams:true});


subCategoryRouter.route("/").post(auth,authorizedRoutes("admin","user"),uploadSingleFile('image','subCategory',fileExtensionsValidation.image),validation(addSubCategoryValidation),subCategoryController.addSubCategory)
.get(auth,authorizedRoutes("admin","user"),validation(validators.getItemById),subCategoryController.getAllSubcategories);

subCategoryRouter.route("/:id").get(auth,authorizedRoutes("admin","user"),validation(getItemParamsRequired),subCategoryController.getSubCategory);

subCategoryRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),validation(validators.deleteItemById),subCategoryController.deleteSubCategory)
.put(auth,authorizedRoutes("admin","user"),validation(updateSubCategoryValidation),subCategoryController.updateSubCategory);

export default subCategoryRouter;