

const dataMethods = ['body','params','query','headers','file'];

export const validation = (schema)=>{

    return (req,res,next)=>{
    
        const validationErrors = [];

        dataMethods.forEach(key => {
            
            if(schema[key]){
                
                const validationResult = schema[key].validate(req[key],{abortEarly:false});
                if(validationResult.error)
                {
                    validationErrors.push(validationResult.error);
                }
            }
        });

        if(validationErrors.length)
        {
            return res.status(400).json({message:"Validation Error" , validationErrors});
        }
    
        return next();
    }

} 