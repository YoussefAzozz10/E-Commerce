import { Router } from "express";
import * as reviewController from "./Review.Controller.js";
import { addReviewValidation, updateReviewValidation } from "./Review.Validation.js";
import { validation } from "../../middleware/validation/Validation.Middleware.js";
import { auth } from "../../middleware/Authentication.js";
import { deleteItemById, getItemByIdFormat } from "../../middleware/validation/Items.Validation.js";
import { authorizedRoutes } from "../../middleware/Authorization.js";

const reviewRouter = Router({mergeParams:true});

reviewRouter.route("/").post(validation(addReviewValidation),reviewController.createReview)
.get(auth,authorizedRoutes("admin","user"),reviewController.getAllReviews);

reviewRouter.get("/:id",auth,authorizedRoutes("admin","user"),validation(getItemByIdFormat),reviewController.getReview);

reviewRouter.route("/:id").delete(auth,authorizedRoutes("admin","user"),validation(deleteItemById),reviewController.deleteReview)
.put(auth,authorizedRoutes("admin","user"),validation(updateReviewValidation),reviewController.updateReview);

export default reviewRouter;