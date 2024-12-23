import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import * as cartController from "./Cart.Controller.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { addTocart, updateQuantity } from "./Cart.Vaidation.js";
import { getItemByIdFormat } from "../../middleware/validation/Items.Validation.js";

const cartRouter = Router({mergeParams:true});

cartRouter.route("/addTocart").post(auth,authorizedRoutes("admin","user"),validation(addTocart),cartController.addToCart);

cartRouter.get("/getCart",auth,authorizedRoutes("admin","user"),cartController.getCart);
cartRouter.get("/clearCart",auth,authorizedRoutes("admin","user"),cartController.clearCart);
cartRouter.patch("/applyCoupon",auth,authorizedRoutes("admin","user"),cartController.applyCoupon);
cartRouter.put("/:id/productQuantity",auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),validation(updateQuantity),cartController.updateProductCartQuantity);
cartRouter.route("/:id/removeFromCart").delete(auth,authorizedRoutes("admin","user"),cartController.removeFromCart);

export default cartRouter;