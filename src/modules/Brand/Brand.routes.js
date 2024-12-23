import { Router } from "express";
import * as brandController from "./Brand.Controller.js";
import { auth } from "../../middleware/Authentication.js";
import * as validators from "../../middleware/validation/Items.Validation.js"
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { uploadSingleFile } from "../../multer/multer.js";
const brandRouter = Router();

brandRouter.route("/").post(auth,uploadSingleFile('image','brand'),validation(validators.addItem),brandController.addBrand)
.get(auth,brandController.getAllBrands);

brandRouter.route("/:id").delete(auth,validation(validators.deleteItemById),brandController.deleteBrand)
.put(auth,validation(validators.updateItemById),brandController.updateBrand);

export default brandRouter;