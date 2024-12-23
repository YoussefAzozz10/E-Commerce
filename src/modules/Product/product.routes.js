import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import * as productController from "./product.controller.js";
import { fileExtensionsValidation, uploadCoverFiles } from "../../multer/multer.js";
import reviewRouter from "../Review/Review.routes.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import { getItemParamsRequired } from "../SubCategory/SubCategory.Validation.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import wishListRouter from "../WishList/WishList.routes.js";
import cartRouter from "../Cart/Cart.Routes.js";
import { addProductSchema } from "./Product.Validation.js";


const productRouter = Router();

productRouter.route("/").post(auth,authorizedRoutes("admin","user"),uploadCoverFiles('product',fileExtensionsValidation.image),validation(addProductSchema),productController.addProduct)
.get(auth,authorizedRoutes("admin","user"),productController.getProducts);


productRouter.use("/:productIvalidationd/reviews",auth,authorizedRoutes("admin","user"),reviewRouter);
productRouter.use("/:id/wishLists",validation(getItemParamsRequired),wishListRouter);
productRouter.use("/:id/cart",validation(getItemParamsRequired),cartRouter);

productRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),validation(getItemParamsRequired),productController.deleteProduct)
.put(auth,authorizedRoutes("admin","user"),validation(getItemParamsRequired),productController.updateProduct)
.get(auth,authorizedRoutes("admin","user"),validation(getItemParamsRequired),productController.getSpecificProduct);


export default productRouter;