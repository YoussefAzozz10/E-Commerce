import { Router } from "express";
import * as authController from "./Auth.User.js";
import * as validators from "../../../middleware/validation/SchemaUserValidation.js";
import { validation } from "../../../middleware/validation/Validation.Middleware.js";
import { auth } from "../../../middleware/Authentication.js";

const authRouter = Router();

authRouter.post("/signup",validation(validators.signupSchema),authController.signup);
authRouter.post("/login",validation(validators.loginSchema),authController.login);
authRouter.get("/verify/:token",authController.verifyEmail);
authRouter.get("/logout",auth,authController.logout);

export default authRouter;