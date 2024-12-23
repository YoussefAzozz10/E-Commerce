import { Router } from "express";
import * as categoryController from "./Category.Controller.js";
import { auth } from "../../middleware/Authentication.js";
import subCategoryRouter from "../SubCategory/subCategory.routes.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import * as validators from "../../middleware/validation/Items.Validation.js";
import { fileExtensionsValidation, uploadSingleFile } from "../../multer/multer.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";

const categoryRouter = Router();

categoryRouter.route("/").post(auth,authorizedRoutes("admin","user"),uploadSingleFile('image','category',fileExtensionsValidation.image),validation(validators.addItem),categoryController.addCategory)
.get(auth,authorizedRoutes("admin","user"),categoryController.getAllCategories);

categoryRouter.use("/:id/subcategories",validation(validators.getItemById),subCategoryRouter);

categoryRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),validation(validators.deleteItemById),categoryController.deleteCategory).
put(auth,authorizedRoutes("admin","user"),validation(validators.updateItemById),categoryController.updateCategory);

export default categoryRouter;