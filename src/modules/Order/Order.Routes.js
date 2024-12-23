import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import * as orderController from "./Order.Controller.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { addAddress } from "../Address/Address.Validation.js";

const orderRouter = Router();

orderRouter.route("/").post(auth,authorizedRoutes("admin","user"),validation(addAddress),orderController.createCashOrder)
.get(auth,authorizedRoutes("admin","user"),orderController.getUserOrders);

orderRouter.get("/allOrders",auth,authorizedRoutes("admin","user"),orderController.getAllOrders);

orderRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),orderController.deleteOrder)
.get(auth,authorizedRoutes("admin","user"),orderController.getSpecificOrder);


export default orderRouter;