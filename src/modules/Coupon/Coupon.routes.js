import { Router } from "express";
import {auth} from "../../middleware/Authentication.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { addCoupon, updateCoupon } from "./Coupon.Validation.js";
import * as couponController from "./Coupon.Controller.js";
import { getItemById, getItemByIdFormat } from "../../middleware/validation/Items.Validation.js";
const couponRouter = Router();


couponRouter.route("/").post(auth,authorizedRoutes("admin","user"),validation(addCoupon),couponController.createCoupon)
.get(auth,authorizedRoutes("admin","user"),couponController.getCoupon);

couponRouter.route("/:id").get(auth,authorizedRoutes("admin","user"),validation(getItemById),couponController.getCoupon);

couponRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),couponController.deleteCoupon)
.put(auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),validation(updateCoupon),couponController.updatetCoupon);

export default couponRouter;