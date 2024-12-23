
export const globalErrorHadnling = (error,req,res,next)=>{
    process.env.MODE == "development" ? res.status(error.statusCode || 400).json({message:"Error",ErrorMessage:error.message})
    : res.status(error.statusCode || 400).json({message:"Error",stack:error.stack});
};
