import { Router } from "express";
import { auth } from "../../middleware/Authentication.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import * as addressController from "./Address.Controller.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { addAddress } from "./Address.Validation.js";
import { getItemByIdFormat } from "../../middleware/validation/Items.Validation.js";

const addressRouter = Router();

addressRouter.route("/").patch(auth,authorizedRoutes("admin","user"),validation(addAddress),addressController.addToAddress)
.get(auth,authorizedRoutes("admin","user"),addressController.getAllAddresses);

addressRouter.route("/:id/deleteAddress").patch(auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),addressController.deleteAddress);

export default addressRouter;