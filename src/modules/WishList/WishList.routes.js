import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import * as wihsListController from "./WishList.Controller.js";

const wishListRouter = Router({mergeParams:true});

wishListRouter.route("/").patch(auth,authorizedRoutes("admin","user"),wihsListController.addToWishList)
.get(auth,authorizedRoutes("admin","user"),wihsListController.getAllWishList);
wishListRouter.route("/deleteWishList").patch(auth,authorizedRoutes("admin","user"),wihsListController.removeFromWishList);

export default wishListRouter;