import { Router } from "express";
import * as userController from "./CRUD/User.js";
import { auth } from "../../middleware/Authentication.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { updateUserSchema } from "../../middleware/validation/SchemaUserValidation.js";
import { deleteItemById, getItemByIdFormat, updateUserPassword } from "../../middleware/validation/Items.Validation.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";
import addressRouter from "../Address/Address.routes.js";

const userRouter = Router();

userRouter.route('/',).get(auth,authorizedRoutes("admin","user"),userController.getUsers);
userRouter.route('/:id',).get(auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),userController.getUsers);
userRouter.use("/user/address",addressRouter);
userRouter.patch("/changeUserPassword/:id",auth,authorizedRoutes("admin","user"),validation(updateUserPassword),userController.changeUserPassword);

userRouter.route('/:id').put(auth,authorizedRoutes("admin","user"),validation(updateUserSchema),userController.updateUserEmail)
.delete(auth,authorizedRoutes("admin","user"),validation(deleteItemById),userController.deleteUser);

export default userRouter;