import morgan from "morgan";
import connection from "../Database/Connection.js"
import { globalErrorHadnling } from "./middleware/GlobalErrorHandling.js";
import brandRouter from "./modules/Brand/Brand.routes.js";
import categoryRouter from "./modules/Category/Category.routes.js";
import subCategoryRouter from "./modules/SubCategory/subCategory.routes.js";
import authRouter from "./modules/User/Auth/Auth.Router.js";
import userRouter from "./modules/User/User.Router.js";
import { AppError } from "./utils/AppError.js";
import productRouter from "./modules/Product/product.routes.js";
import reviewRouter from "./modules/Review/Review.routes.js";
import wishListRouter from "./modules/WishList/WishList.routes.js";
import addressRouter from "./modules/Address/Address.routes.js";
import couponRouter from "./modules/Coupon/Coupon.routes.js";
import cartRouter from "./modules/Cart/Cart.Routes.js";
import orderRouter from "./modules/Order/Order.Routes.js";


const bootstrap = (app,express)=>{

    app.use(express.json());
    app.use(express.static('uploads'));
    // app.use(morgan('dev'));
    app.use("/auth",authRouter);
    app.use("/categories",categoryRouter);
    app.use("/subCategories",subCategoryRouter);
    app.use("/brands",brandRouter);
    app.use("/products",productRouter);
    app.use("/users",userRouter);
    app.use("/reviews",reviewRouter);
    app.use("/wishLists",wishListRouter);
    app.use("/address",addressRouter);
    app.use("/coupons",couponRouter);
    app.use("/cart",cartRouter);
    app.use("/orders",orderRouter);
    
    app.use("*",(req,res,next)=>{

        return next(new AppError("In-VALID Routing",404));
    });

    app.use(globalErrorHadnling);

    connection();

}

export default bootstrap;